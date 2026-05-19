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
    public string Sku { get; init; } = default!;
    public Guid CategoryId { get; init; }
    public string CategoryName { get; init; } = default!;
    public bool IsActive { get; init; }
    public bool IsFeatured { get; init; }
    public string? MainImageUrl { get; init; }
    public List<ProductImageDto> Images { get; init; } = [];
    public List<ProductAttributeDto> Attributes { get; init; } = [];
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
