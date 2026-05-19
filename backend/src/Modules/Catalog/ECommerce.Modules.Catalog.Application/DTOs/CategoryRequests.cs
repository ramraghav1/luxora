using System.ComponentModel.DataAnnotations;

namespace ECommerce.Modules.Catalog.Application.DTOs;

public record CreateCategoryRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; init; } = default!;

    public string? Description { get; init; }
    public string? ImageUrl { get; init; }
    public Guid? ParentCategoryId { get; init; }
    public int SortOrder { get; init; }
}

public record UpdateCategoryRequest
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; init; } = default!;

    public string? Description { get; init; }
    public string? ImageUrl { get; init; }
    public Guid? ParentCategoryId { get; init; }
    public int SortOrder { get; init; }
}
