using ECommerce.Modules.Catalog.Application.DTOs;
using ECommerce.Modules.Catalog.Application.Interfaces;
using ECommerce.Modules.Catalog.Application.Mappings;
using ECommerce.Modules.Catalog.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Catalog.Application.Services;

public sealed class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<Result<CategoryDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        if (category is null)
            return Result<CategoryDto>.Failure("Category not found.");

        return Result<CategoryDto>.Success(category.ToDto());
    }

    public async Task<Result<CategoryDto>> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetBySlugAsync(slug, cancellationToken);
        if (category is null)
            return Result<CategoryDto>.Failure("Category not found.");

        return Result<CategoryDto>.Success(category.ToDto());
    }

    public async Task<Result<IReadOnlyList<CategoryDto>>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categories = await _categoryRepository.GetAllAsync(cancellationToken);
        var dtos = categories.Select(c => c.ToDto()).ToList() as IReadOnlyList<CategoryDto>;
        return Result<IReadOnlyList<CategoryDto>>.Success(dtos);
    }

    public async Task<Result<IReadOnlyList<CategoryDto>>> GetHierarchyAsync(CancellationToken cancellationToken = default)
    {
        var categories = await _categoryRepository.GetWithSubCategoriesAsync(cancellationToken);
        var dtos = categories.Select(c => c.ToDto(includeSubCategories: true)).ToList() as IReadOnlyList<CategoryDto>;
        return Result<IReadOnlyList<CategoryDto>>.Success(dtos);
    }

    public async Task<Result<CategoryDto>> CreateAsync(CreateCategoryRequest request, CancellationToken cancellationToken = default)
    {
        if (request.ParentCategoryId.HasValue)
        {
            var parent = await _categoryRepository.GetByIdAsync(request.ParentCategoryId.Value, cancellationToken);
            if (parent is null)
                return Result<CategoryDto>.Failure("Parent category not found.");
        }

        var category = Category.Create(
            name: request.Name,
            description: request.Description,
            imageUrl: request.ImageUrl,
            parentCategoryId: request.ParentCategoryId,
            sortOrder: request.SortOrder);

        await _categoryRepository.AddAsync(category, cancellationToken);

        var created = await _categoryRepository.GetByIdAsync(category.Id, cancellationToken);
        return Result<CategoryDto>.Success(created!.ToDto());
    }

    public async Task<Result<CategoryDto>> UpdateAsync(Guid id, UpdateCategoryRequest request, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        if (category is null)
            return Result<CategoryDto>.Failure("Category not found.");

        if (request.ParentCategoryId.HasValue)
        {
            if (request.ParentCategoryId.Value == id)
                return Result<CategoryDto>.Failure("A category cannot be its own parent.");

            var parent = await _categoryRepository.GetByIdAsync(request.ParentCategoryId.Value, cancellationToken);
            if (parent is null)
                return Result<CategoryDto>.Failure("Parent category not found.");
        }

        category.Update(request.Name, request.Description, request.ImageUrl, request.ParentCategoryId, request.SortOrder);
        await _categoryRepository.UpdateAsync(category, cancellationToken);

        var updated = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        return Result<CategoryDto>.Success(updated!.ToDto());
    }

    public async Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        if (category is null)
            return Result.Failure("Category not found.");

        var hasProducts = await _categoryRepository.HasProductsAsync(id, cancellationToken);
        if (hasProducts)
            return Result.Failure("Cannot delete a category that has products. Move or delete the products first.");

        await _categoryRepository.DeleteAsync(category, cancellationToken);
        return Result.Success();
    }
}
