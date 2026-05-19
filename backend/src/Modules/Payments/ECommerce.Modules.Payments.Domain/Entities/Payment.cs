using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Payments.Domain.Entities;

public class Payment : AggregateRoot
{
    public Guid OrderId { get; private set; }
    public decimal Amount { get; private set; }
    public string Currency { get; private set; } = "USD";
    public PaymentMethod Method { get; private set; }
    public PaymentStatus Status { get; private set; } = PaymentStatus.Pending;
    public string? TransactionId { get; private set; }
    public string? PayPalOrderId { get; private set; }
    public string? PayerEmail { get; private set; }
    public string? PayerId { get; private set; }
    public string? FailureReason { get; private set; }
    public DateTime? PaidAt { get; private set; }
    public string? RefundId { get; private set; }
    public decimal? RefundedAmount { get; private set; }
    public DateTime? RefundedAt { get; private set; }

    private readonly List<PaymentTransaction> _transactions = [];
    public IReadOnlyCollection<PaymentTransaction> Transactions => _transactions.AsReadOnly();

    private Payment() { }

    public static Payment Create(Guid orderId, decimal amount, PaymentMethod method, string currency = "USD")
    {
        var payment = new Payment
        {
            OrderId = orderId,
            Amount = amount,
            Method = method,
            Currency = currency
        };
        payment._transactions.Add(PaymentTransaction.Create(payment.Id, "INITIATED", $"Payment of {amount} {currency} initiated via {method}"));
        return payment;
    }

    public void SetPayPalOrderId(string paypalOrderId)
    {
        PayPalOrderId = paypalOrderId;
        _transactions.Add(PaymentTransaction.Create(Id, "PAYPAL_ORDER_CREATED", $"PayPal order {paypalOrderId} created"));
        SetUpdated();
    }

    public void MarkAsSucceeded(string transactionId, string? payerEmail = null, string? payerId = null)
    {
        Status = PaymentStatus.Succeeded;
        TransactionId = transactionId;
        PayerEmail = payerEmail;
        PayerId = payerId;
        PaidAt = DateTime.UtcNow;
        _transactions.Add(PaymentTransaction.Create(Id, "CAPTURED", $"Payment captured. Transaction: {transactionId}"));
        SetUpdated();
    }

    public void MarkAsFailed(string reason)
    {
        Status = PaymentStatus.Failed;
        FailureReason = reason;
        _transactions.Add(PaymentTransaction.Create(Id, "FAILED", $"Payment failed: {reason}"));
        SetUpdated();
    }

    public void MarkAsRefunded(string refundId, decimal refundedAmount)
    {
        Status = PaymentStatus.Refunded;
        RefundId = refundId;
        RefundedAmount = refundedAmount;
        RefundedAt = DateTime.UtcNow;
        _transactions.Add(PaymentTransaction.Create(Id, "REFUNDED", $"Refunded {refundedAmount} {Currency}. Refund ID: {refundId}"));
        SetUpdated();
    }
}

public enum PaymentStatus { Pending, Succeeded, Failed, Refunded }
public enum PaymentMethod { CreditCard, DebitCard, PayPal, BankTransfer, CashOnDelivery }
