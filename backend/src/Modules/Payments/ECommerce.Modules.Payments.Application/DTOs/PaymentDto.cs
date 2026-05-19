namespace ECommerce.Modules.Payments.Application.DTOs;

public record PaymentDto
{
    public Guid Id { get; init; }
    public Guid OrderId { get; init; }
    public decimal Amount { get; init; }
    public string Currency { get; init; } = default!;
    public string Method { get; init; } = default!;
    public string Status { get; init; } = default!;
    public string? TransactionId { get; init; }
    public string? PayPalOrderId { get; init; }
    public string? PayerEmail { get; init; }
    public string? FailureReason { get; init; }
    public DateTime? PaidAt { get; init; }
    public decimal? RefundedAmount { get; init; }
    public DateTime? RefundedAt { get; init; }
    public DateTime CreatedAt { get; init; }
    public List<PaymentTransactionDto> Transactions { get; init; } = [];
}

public record PaymentTransactionDto
{
    public Guid Id { get; init; }
    public string EventType { get; init; } = default!;
    public string Description { get; init; } = default!;
    public DateTime OccurredAt { get; init; }
}

public record VoucherDto
{
    public Guid Id { get; init; }
    public string VoucherNumber { get; init; } = default!;
    public Guid PaymentId { get; init; }
    public Guid OrderId { get; init; }
    public decimal Amount { get; init; }
    public string Currency { get; init; } = default!;
    public string CustomerEmail { get; init; } = default!;
    public string Description { get; init; } = default!;
    public string Type { get; init; } = default!;
    public DateTime IssuedAt { get; init; }
}

public record CreatePayPalOrderRequest
{
    public Guid OrderId { get; init; }
    public decimal Amount { get; init; }
    public string Currency { get; init; } = "USD";
}

public record CapturePayPalOrderRequest
{
    public string PayPalOrderId { get; init; } = default!;
}

public record RefundPaymentRequest
{
    public Guid PaymentId { get; init; }
    public decimal? Amount { get; init; } // null = full refund
    public string Reason { get; init; } = default!;
}

public record PayPalOrderResponse
{
    public string PayPalOrderId { get; init; } = default!;
    public string ApprovalUrl { get; init; } = default!;
    public Guid PaymentId { get; init; }
}
