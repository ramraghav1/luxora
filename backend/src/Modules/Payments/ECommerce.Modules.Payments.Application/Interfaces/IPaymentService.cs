using ECommerce.Modules.Payments.Application.DTOs;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Payments.Application.Interfaces;

public interface IPaymentService
{
    Task<Result<PayPalOrderResponse>> CreatePayPalOrderAsync(CreatePayPalOrderRequest request, CancellationToken cancellationToken = default);
    Task<Result<PaymentDto>> CapturePayPalOrderAsync(CapturePayPalOrderRequest request, CancellationToken cancellationToken = default);
    Task<Result<PaymentDto>> RefundPaymentAsync(RefundPaymentRequest request, CancellationToken cancellationToken = default);
    Task<Result<PaymentDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result<PaymentDto>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default);
    Task<Result<IReadOnlyList<VoucherDto>>> GetVouchersForOrderAsync(Guid orderId, CancellationToken cancellationToken = default);
}
