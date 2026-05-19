using ECommerce.Modules.Payments.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Payments.Application.Interfaces;

public interface IPaymentRepository : IRepository<Payment>
{
    Task<Payment?> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
    Task<Payment?> GetByPayPalOrderIdAsync(string paypalOrderId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Payment>> GetByCustomerIdAsync(Guid customerId, CancellationToken cancellationToken = default);
}
