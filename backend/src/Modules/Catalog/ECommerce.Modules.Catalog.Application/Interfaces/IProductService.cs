using ECommerce.Modules.Catalog.Application.DTOs;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Catalog.Application.Interfaces;

public interface IProductService
{
    Task<Result<ProductDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result<ProductDto>> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
    Task<Result<PagedResult<ProductDto>>> GetPagedAsync(ProductQueryParameters parameters, CancellationToken cancellationToken = default);
    Task<Result<IReadOnlyList<ProductDto>>> GetFeaturedAsync(int count, CancellationToken cancellationToken = default);
    Task<Result<ProductDto>> CreateAsync(CreateProductRequest request, CancellationToken cancellationToken = default);
    Task<Result<ProductDto>> UpdateAsync(Guid id, UpdateProductRequest request, CancellationToken cancellationToken = default);
    Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result> ActivateAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result> DeactivateAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result<ProductDto>> UpdateStatusAsync(Guid id, UpdateProductStatusRequest request, CancellationToken cancellationToken = default);
}
