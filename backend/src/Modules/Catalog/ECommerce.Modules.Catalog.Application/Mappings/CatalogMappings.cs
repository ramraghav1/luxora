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
            SalePrice = product.SalePrice,
            Sku = product.Sku,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name ?? string.Empty,
            Status = product.Status,
            IsActive = product.IsActive,
            IsFeatured = product.IsFeatured,
            MainImageUrl = product.MainImageUrl,
            Tags = product.Tags,
            Brand = product.Brand,
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
            Media = product.Media.Select(m => new ProductMediaDto
            {
                Id = m.Id,
                Url = m.Url,
                Type = m.Type,
                AltText = m.AltText,
                ThumbnailUrl = m.ThumbnailUrl,
                SortOrder = m.SortOrder,
                IsPrimary = m.IsPrimary
            }).OrderBy(m => m.SortOrder).ToList(),
            Variants = product.Variants.Select(v => new ProductVariantDto
            {
                Id = v.Id,
                ProductId = v.ProductId,
                ProductName = v.Product?.Name ?? string.Empty,
                ProductImageUrl = v.Product?.MainImageUrl,
                VariantGroupId = v.VariantGroupId,
                ColorName = v.ColorName,
                ColorHex = v.ColorHex,
                SortOrder = v.SortOrder
            }).OrderBy(v => v.SortOrder).ToList(),
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
