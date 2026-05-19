using ECommerce.Modules.Catalog.Application.DTOs;
using ECommerce.Modules.Catalog.Domain.Entities;

namespace ECommerce.Modules.Catalog.Application.Mappings;

public static class CatalogMappings
{
    public static ProductDto ToDto(this Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Slug = product.Slug,
            Description = product.Description,
            ShortDescription = product.ShortDescription,
            Price = product.Price,
            CompareAtPrice = product.CompareAtPrice,
            Sku = product.Sku,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name ?? string.Empty,
            IsActive = product.IsActive,
            IsFeatured = product.IsFeatured,
            MainImageUrl = product.MainImageUrl,
            Images = product.Images.Select(i => new ProductImageDto
            {
                Id = i.Id,
                Url = i.Url,
                AltText = i.AltText,
                SortOrder = i.SortOrder
            }).OrderBy(i => i.SortOrder).ToList(),
            Attributes = product.Attributes.Select(a => new ProductAttributeDto
            {
                Id = a.Id,
                Name = a.Name,
                Value = a.Value
            }).ToList(),
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }

    public static CategoryDto ToDto(this Category category, bool includeSubCategories = false)
    {
        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Slug = category.Slug,
            Description = category.Description,
            ImageUrl = category.ImageUrl,
            ParentCategoryId = category.ParentCategoryId,
            ParentCategoryName = category.ParentCategory?.Name,
            IsActive = category.IsActive,
            SortOrder = category.SortOrder,
            ProductCount = category.Products.Count,
            SubCategories = includeSubCategories
                ? category.SubCategories.Select(sc => sc.ToDto(true)).ToList()
                : [],
            CreatedAt = category.CreatedAt,
            UpdatedAt = category.UpdatedAt
        };
    }
}
