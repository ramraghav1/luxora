using ECommerce.Modules.Catalog.Domain.Enums;

namespace ECommerce.Modules.Catalog.Application.DTOs;

public record ProductDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = default!;
    public string Slug { get; init; } = default!;
    public string Description { get; init; } = default!;
    public string ShortDescription { get; init; } = default!;
    public decimal Price { get; init; }
    public decimal? CompareAtPrice { get; init; }
    public decimal? SalePrice { get; init; }
    public string Sku { get; init; } = default!;
    public Guid CategoryId { get; init; }
    public string CategoryName { get; init; } = default!;
    public ProductStatus Status { get; init; }
    public bool IsActive { get; init; }
    public bool IsFeatured { get; init; }
    public string? MainImageUrl { get; init; }
    public string? Tags { get; init; }
    public string? Brand { get; init; }
    public List<ProductImageDto> Images { get; init; } = [];
    public List<ProductAttributeDto> Attributes { get; init; } = [];
    public List<ProductMediaDto> Media { get; init; } = [];
    public List<ProductVariantDto> Variants { get; init; } = [];
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}

public record ProductImageDto
{
    public Guid Id { get; init; }
    public string Url { get; init; } = default!;
    public string? AltText { get; init; }
    public int SortOrder { get; init; }
}

public record ProductAttributeDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = default!;
    public string Value { get; init; } = default!;
}

public record ProductMediaDto
{
    public Guid Id { get; init; }
    public string Url { get; init; } = default!;
    public MediaType Type { get; init; }
    public string? AltText { get; init; }
    public string? ThumbnailUrl { get; init; }
    public int SortOrder { get; init; }
    public bool IsPrimary { get; init; }
}

public record ProductVariantDto
{
    public Guid Id { get; init; }
    public Guid ProductId { get; init; }
    public string ProductName { get; init; } = default!;
    public string? ProductImageUrl { get; init; }
    public Guid VariantGroupId { get; init; }
    public string ColorName { get; init; } = default!;
    public string ColorHex { get; init; } = default!;
    public int SortOrder { get; init; }
}
