using ECommerce.Modules.Catalog.Application.DTOs;
using ECommerce.Modules.Catalog.Application.Interfaces;
using ECommerce.Modules.Catalog.Application.Mappings;
using ECommerce.Modules.Catalog.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Catalog.Application.Services;

public sealed class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<Result<ProductDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
            return Result<ProductDto>.Failure("Product not found.");

        return Result<ProductDto>.Success(product.ToDto());
    }

    public async Task<Result<ProductDto>> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetBySlugAsync(slug, cancellationToken);
        if (product is null)
            return Result<ProductDto>.Failure("Product not found.");

        return Result<ProductDto>.Success(product.ToDto());
    }

    public async Task<Result<PagedResult<ProductDto>>> GetPagedAsync(
        ProductQueryParameters parameters,
        CancellationToken cancellationToken = default)
    {
        var (items, totalCount) = await _productRepository.GetPagedAsync(parameters, cancellationToken);

        var dtos = items.Select(p => p.ToDto()).ToList();
        var pagedResult = new PagedResult<ProductDto>(dtos, totalCount, parameters.Page, parameters.PageSize);

        return Result<PagedResult<ProductDto>>.Success(pagedResult);
    }

    public async Task<Result<IReadOnlyList<ProductDto>>> GetFeaturedAsync(int count, CancellationToken cancellationToken = default)
    {
        var products = await _productRepository.GetFeaturedAsync(count, cancellationToken);
        var dtos = products.Select(p => p.ToDto()).ToList() as IReadOnlyList<ProductDto>;
        return Result<IReadOnlyList<ProductDto>>.Success(dtos);
    }

    public async Task<Result<ProductDto>> CreateAsync(CreateProductRequest request, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetByIdAsync(request.CategoryId, cancellationToken);
        if (category is null)
            return Result<ProductDto>.Failure("Category not found.");

        var skuExists = await _productRepository.ExistsBySkuAsync(request.Sku, cancellationToken: cancellationToken);
        if (skuExists)
            return Result<ProductDto>.Failure($"A product with SKU '{request.Sku}' already exists.");

        var product = Product.Create(
            name: request.Name,
            description: request.Description,
            shortDescription: request.ShortDescription,
            price: request.Price,
            sku: request.Sku,
            categoryId: request.CategoryId,
            compareAtPrice: request.CompareAtPrice,
            mainImageUrl: request.MainImageUrl,
            isFeatured: request.IsFeatured);

        await _productRepository.AddAsync(product, cancellationToken);

        // Re-fetch to include navigation properties
        var created = await _productRepository.GetByIdAsync(product.Id, cancellationToken);
        return Result<ProductDto>.Success(created!.ToDto());
    }

    public async Task<Result<ProductDto>> UpdateAsync(Guid id, UpdateProductRequest request, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
            return Result<ProductDto>.Failure("Product not found.");

        var category = await _categoryRepository.GetByIdAsync(request.CategoryId, cancellationToken);
        if (category is null)
            return Result<ProductDto>.Failure("Category not found.");

        var skuExists = await _productRepository.ExistsBySkuAsync(request.Sku, id, cancellationToken);
        if (skuExists)
            return Result<ProductDto>.Failure($"A product with SKU '{request.Sku}' already exists.");

        product.Update(
            name: request.Name,
            description: request.Description,
            shortDescription: request.ShortDescription,
            price: request.Price,
            sku: request.Sku,
            categoryId: request.CategoryId,
            compareAtPrice: request.CompareAtPrice,
            mainImageUrl: request.MainImageUrl,
            isFeatured: request.IsFeatured);

        await _productRepository.UpdateAsync(product, cancellationToken);

        var updated = await _productRepository.GetByIdAsync(id, cancellationToken);
        return Result<ProductDto>.Success(updated!.ToDto());
    }

    public async Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
            return Result.Failure("Product not found.");

        await _productRepository.DeleteAsync(product, cancellationToken);
        return Result.Success();
    }

    public async Task<Result> ActivateAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
            return Result.Failure("Product not found.");

        product.Activate();
        await _productRepository.UpdateAsync(product, cancellationToken);
        return Result.Success();
    }

    public async Task<Result> DeactivateAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
            return Result.Failure("Product not found.");

        product.Deactivate();
        await _productRepository.UpdateAsync(product, cancellationToken);
        return Result.Success();
    }
}
