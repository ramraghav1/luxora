using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Payments.Domain.Entities;

public class Voucher : BaseEntity
{
    public string VoucherNumber { get; private set; } = default!;
    public Guid PaymentId { get; private set; }
    public Guid OrderId { get; private set; }
    public decimal Amount { get; private set; }
    public string Currency { get; private set; } = "USD";
    public string CustomerEmail { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public VoucherType Type { get; private set; }
    public DateTime IssuedAt { get; private set; }

    private Voucher() { }

    public static Voucher Create(Guid paymentId, Guid orderId, decimal amount, string currency, string customerEmail, string description, VoucherType type)
    {
        return new Voucher
        {
            VoucherNumber = $"VCH-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..8].ToUpper()}",
            PaymentId = paymentId,
            OrderId = orderId,
            Amount = amount,
            Currency = currency,
            CustomerEmail = customerEmail,
            Description = description,
            Type = type,
            IssuedAt = DateTime.UtcNow
        };
    }
}

public enum VoucherType
{
    PaymentReceipt = 0,
    Refund = 1
}
