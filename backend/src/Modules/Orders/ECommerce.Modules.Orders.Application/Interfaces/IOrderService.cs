using ECommerce.Modules.Orders.Application.DTOs;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Orders.Application.Interfaces;

public interface IOrderService
{
    Task<Result<OrderDto>> CreateOrderAsync(Guid customerId, CreateOrderRequest request, CancellationToken cancellationToken = default);
    Task<Result<OrderDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result<IReadOnlyList<OrderDto>>> GetByCustomerIdAsync(Guid customerId, CancellationToken cancellationToken = default);
    Task<Result<OrderDto>> UpdateStatusAsync(Guid id, string status, CancellationToken cancellationToken = default);
}
