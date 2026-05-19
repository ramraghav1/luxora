using ECommerce.Modules.Payments.Application.DTOs;
using ECommerce.Modules.Payments.Application.Interfaces;
using ECommerce.Modules.Payments.Application.Mappings;
using ECommerce.Modules.Payments.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Payments.Application.Services;

public sealed class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly IVoucherRepository _voucherRepository;
    private readonly IPayPalClient _payPalClient;

    public PaymentService(
        IPaymentRepository paymentRepository,
        IVoucherRepository voucherRepository,
        IPayPalClient payPalClient)
    {
        _paymentRepository = paymentRepository;
        _voucherRepository = voucherRepository;
        _payPalClient = payPalClient;
    }

    public async Task<Result<PayPalOrderResponse>> CreatePayPalOrderAsync(CreatePayPalOrderRequest request, CancellationToken cancellationToken = default)
    {
        // Create payment record
        var payment = Payment.Create(request.OrderId, request.Amount, PaymentMethod.PayPal, request.Currency);

        // Create PayPal order
        var (paypalOrderId, approvalUrl) = await _payPalClient.CreateOrderAsync(
            request.Amount, request.Currency, request.OrderId.ToString(), cancellationToken);

        payment.SetPayPalOrderId(paypalOrderId);
        await _paymentRepository.AddAsync(payment, cancellationToken);

        return Result<PayPalOrderResponse>.Success(new PayPalOrderResponse
        {
            PayPalOrderId = paypalOrderId,
            ApprovalUrl = approvalUrl,
            PaymentId = payment.Id
        });
    }

    public async Task<Result<PaymentDto>> CapturePayPalOrderAsync(CapturePayPalOrderRequest request, CancellationToken cancellationToken = default)
    {
        var payment = await _paymentRepository.GetByPayPalOrderIdAsync(request.PayPalOrderId, cancellationToken);
        if (payment is null)
            return Result<PaymentDto>.Failure("Payment not found for this PayPal order.");

        var captureResult = await _payPalClient.CaptureOrderAsync(request.PayPalOrderId, cancellationToken);

        if (!captureResult.Success)
        {
            payment.MarkAsFailed(captureResult.ErrorMessage ?? "Capture failed");
            await _paymentRepository.UpdateAsync(payment, cancellationToken);
            return Result<PaymentDto>.Failure(captureResult.ErrorMessage ?? "Payment capture failed.");
        }

        payment.MarkAsSucceeded(captureResult.CaptureId!, captureResult.PayerEmail, captureResult.PayerId);
        await _paymentRepository.UpdateAsync(payment, cancellationToken);

        // Generate payment receipt voucher
        var voucher = Voucher.Create(
            payment.Id,
            payment.OrderId,
            payment.Amount,
            payment.Currency,
            captureResult.PayerEmail ?? "unknown",
            $"Payment receipt for order. Transaction: {captureResult.CaptureId}",
            VoucherType.PaymentReceipt);

        await _voucherRepository.AddAsync(voucher, cancellationToken);

        return Result<PaymentDto>.Success(payment.ToDto());
    }

    public async Task<Result<PaymentDto>> RefundPaymentAsync(RefundPaymentRequest request, CancellationToken cancellationToken = default)
    {
        var payment = await _paymentRepository.GetByIdAsync(request.PaymentId, cancellationToken);
        if (payment is null)
            return Result<PaymentDto>.Failure("Payment not found.");

        if (payment.Status != PaymentStatus.Succeeded)
            return Result<PaymentDto>.Failure("Only succeeded payments can be refunded.");

        var refundAmount = request.Amount ?? payment.Amount;

        var refundResult = await _payPalClient.RefundCaptureAsync(
            payment.TransactionId!, refundAmount, payment.Currency, cancellationToken);

        if (!refundResult.Success)
            return Result<PaymentDto>.Failure(refundResult.ErrorMessage ?? "Refund failed.");

        payment.MarkAsRefunded(refundResult.RefundId!, refundAmount);
        await _paymentRepository.UpdateAsync(payment, cancellationToken);

        // Generate refund voucher
        var voucher = Voucher.Create(
            payment.Id,
            payment.OrderId,
            refundAmount,
            payment.Currency,
            payment.PayerEmail ?? "unknown",
            $"Refund issued. Reason: {request.Reason}. Refund ID: {refundResult.RefundId}",
            VoucherType.Refund);

        await _voucherRepository.AddAsync(voucher, cancellationToken);

        return Result<PaymentDto>.Success(payment.ToDto());
    }

    public async Task<Result<PaymentDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var payment = await _paymentRepository.GetByIdAsync(id, cancellationToken);
        if (payment is null)
            return Result<PaymentDto>.Failure("Payment not found.");

        return Result<PaymentDto>.Success(payment.ToDto());
    }

    public async Task<Result<PaymentDto>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
    {
        var payment = await _paymentRepository.GetByOrderIdAsync(orderId, cancellationToken);
        if (payment is null)
            return Result<PaymentDto>.Failure("Payment not found for this order.");

        return Result<PaymentDto>.Success(payment.ToDto());
    }

    public async Task<Result<IReadOnlyList<VoucherDto>>> GetVouchersForOrderAsync(Guid orderId, CancellationToken cancellationToken = default)
    {
        var vouchers = await _voucherRepository.GetByOrderIdAsync(orderId, cancellationToken);
        var dtos = vouchers.Select(v => v.ToDto()).ToList() as IReadOnlyList<VoucherDto>;
        return Result<IReadOnlyList<VoucherDto>>.Success(dtos);
    }
}
