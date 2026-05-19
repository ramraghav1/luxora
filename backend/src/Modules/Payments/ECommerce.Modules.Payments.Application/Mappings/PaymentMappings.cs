using ECommerce.Modules.Payments.Application.DTOs;
using ECommerce.Modules.Payments.Domain.Entities;

namespace ECommerce.Modules.Payments.Application.Mappings;

public static class PaymentMappings
{
    public static PaymentDto ToDto(this Payment payment) => new()
    {
        Id = payment.Id,
        OrderId = payment.OrderId,
        Amount = payment.Amount,
        Currency = payment.Currency,
        Method = payment.Method.ToString(),
        Status = payment.Status.ToString(),
        TransactionId = payment.TransactionId,
        PayPalOrderId = payment.PayPalOrderId,
        PayerEmail = payment.PayerEmail,
        FailureReason = payment.FailureReason,
        PaidAt = payment.PaidAt,
        RefundedAmount = payment.RefundedAmount,
        RefundedAt = payment.RefundedAt,
        CreatedAt = payment.CreatedAt,
        Transactions = payment.Transactions.Select(t => t.ToDto()).ToList()
    };

    public static PaymentTransactionDto ToDto(this PaymentTransaction transaction) => new()
    {
        Id = transaction.Id,
        EventType = transaction.EventType,
        Description = transaction.Description,
        OccurredAt = transaction.OccurredAt
    };

    public static VoucherDto ToDto(this Voucher voucher) => new()
    {
        Id = voucher.Id,
        VoucherNumber = voucher.VoucherNumber,
        PaymentId = voucher.PaymentId,
        OrderId = voucher.OrderId,
        Amount = voucher.Amount,
        Currency = voucher.Currency,
        CustomerEmail = voucher.CustomerEmail,
        Description = voucher.Description,
        Type = voucher.Type.ToString(),
        IssuedAt = voucher.IssuedAt
    };
}
