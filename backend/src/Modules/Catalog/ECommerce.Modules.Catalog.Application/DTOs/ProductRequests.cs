using System.ComponentModel.DataAnnotations;

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

    [Required]
    [StringLength(50)]
    public string Sku { get; init; } = default!;

    [Required]
    public Guid CategoryId { get; init; }

    public string? MainImageUrl { get; init; }
    public bool IsFeatured { get; init; }
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

    [Required]
    [StringLength(50)]
    public string Sku { get; init; } = default!;

    [Required]
    public Guid CategoryId { get; init; }

    public string? MainImageUrl { get; init; }
    public bool IsFeatured { get; init; }
}
