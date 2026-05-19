using ECommerce.Modules.Orders.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Orders.Application.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<IReadOnlyList<Order>> GetByCustomerIdAsync(Guid customerId, CancellationToken cancellationToken = default);
    Task<Order?> GetByOrderNumberAsync(string orderNumber, CancellationToken cancellationToken = default);
}
