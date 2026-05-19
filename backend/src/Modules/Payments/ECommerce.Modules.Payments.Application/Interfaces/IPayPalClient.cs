namespace ECommerce.Modules.Payments.Application.Interfaces;

public interface IPayPalClient
{
    Task<(string OrderId, string ApprovalUrl)> CreateOrderAsync(decimal amount, string currency, string referenceId, CancellationToken cancellationToken = default);
    Task<PayPalCaptureResult> CaptureOrderAsync(string paypalOrderId, CancellationToken cancellationToken = default);
    Task<PayPalRefundResult> RefundCaptureAsync(string captureId, decimal? amount, string currency, CancellationToken cancellationToken = default);
}

public record PayPalCaptureResult
{
    public bool Success { get; init; }
    public string? CaptureId { get; init; }
    public string? PayerEmail { get; init; }
    public string? PayerId { get; init; }
    public string? ErrorMessage { get; init; }
}

public record PayPalRefundResult
{
    public bool Success { get; init; }
    public string? RefundId { get; init; }
    public string? ErrorMessage { get; init; }
}
