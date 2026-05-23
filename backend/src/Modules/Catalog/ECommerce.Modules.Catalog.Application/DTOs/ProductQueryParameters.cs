using ECommerce.Modules.Catalog.Domain.Enums;

namespace ECommerce.Modules.Catalog.Application.DTOs;

public record ProductQueryParameters
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 20;
    public string? Search { get; init; }
    public Guid? CategoryId { get; init; }
    public decimal? MinPrice { get; init; }
    public decimal? MaxPrice { get; init; }
    public bool? IsActive { get; init; }
    public bool? IsFeatured { get; init; }
    public ProductStatus? Status { get; init; }
    public string SortBy { get; init; } = "CreatedAt";
    public string SortDirection { get; init; } = "desc";
}
