using System.ComponentModel.DataAnnotations;
using ECommerce.Modules.Catalog.Domain.Enums;

namespace ECommerce.Modules.Catalog.Application.DTOs;

public record CreateProductRequest
{
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Name { get; init; } = default!;

    [Required]
    public string Description { get; init; } = default!;

    [Required]
    [StringLength(500)]
    public string ShortDescription { get; init; } = default!;

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public decimal Price { get; init; }

    public decimal? CompareAtPrice { get; init; }
    public decimal? SalePrice { get; init; }

    [Required]
    [StringLength(50)]
    public string Sku { get; init; } = default!;

    [Required]
    public Guid CategoryId { get; init; }

    public string? MainImageUrl { get; init; }
    public bool IsFeatured { get; init; }
    public string? Tags { get; init; }
    public string? Brand { get; init; }
    public ProductStatus Status { get; init; } = ProductStatus.Draft;

    public List<MediaRequest> Media { get; init; } = [];
    public List<AttributeRequest> Attributes { get; init; } = [];
    public List<VariantRequest> Variants { get; init; } = [];
}

public record UpdateProductRequest
{
    [Required]
    [StringLength(200, MinimumLength = 2)]
    public string Name { get; init; } = default!;

    [Required]
    public string Description { get; init; } = default!;

    [Required]
    [StringLength(500)]
    public string ShortDescription { get; init; } = default!;

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; init; }

    public decimal? CompareAtPrice { get; init; }
    public decimal? SalePrice { get; init; }

    [Required]
    [StringLength(50)]
    public string Sku { get; init; } = default!;

    [Required]
    public Guid CategoryId { get; init; }

    public string? MainImageUrl { get; init; }
    public bool IsFeatured { get; init; }
    public string? Tags { get; init; }
    public string? Brand { get; init; }
    public ProductStatus Status { get; init; }

    public List<MediaRequest> Media { get; init; } = [];
    public List<AttributeRequest> Attributes { get; init; } = [];
    public List<VariantRequest> Variants { get; init; } = [];
}

public record UpdateProductStatusRequest
{
    [Required]
    public ProductStatus Status { get; init; }
    public decimal? SalePrice { get; init; }
}

public record MediaRequest
{
    [Required]
    public string Url { get; init; } = default!;
    public MediaType Type { get; init; } = MediaType.Image;
    public string? AltText { get; init; }
    public string? ThumbnailUrl { get; init; }
    public int SortOrder { get; init; }
    public bool IsPrimary { get; init; }
}

public record AttributeRequest
{
    [Required]
    public string Name { get; init; } = default!;
    [Required]
    public string Value { get; init; } = default!;
}

public record VariantRequest
{
    [Required]
    public Guid ProductId { get; init; }
    [Required]
    public string ColorName { get; init; } = default!;
    [Required]
    public string ColorHex { get; init; } = default!;
    public int SortOrder { get; init; }
}
