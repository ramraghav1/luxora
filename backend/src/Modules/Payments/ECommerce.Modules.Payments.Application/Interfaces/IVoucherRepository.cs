using ECommerce.Modules.Payments.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Payments.Application.Interfaces;

public interface IVoucherRepository : IRepository<Voucher>
{
    Task<IReadOnlyList<Voucher>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
    Task<Voucher?> GetByVoucherNumberAsync(string voucherNumber, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Voucher>> GetByPaymentIdAsync(Guid paymentId, CancellationToken cancellationToken = default);
}
