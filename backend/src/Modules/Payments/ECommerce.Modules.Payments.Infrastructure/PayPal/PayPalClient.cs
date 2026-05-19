using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using ECommerce.Modules.Payments.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace ECommerce.Modules.Payments.Infrastructure.PayPal;

public sealed class PayPalClient : IPayPalClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<PayPalClient> _logger;
    private string? _accessToken;
    private DateTime _tokenExpiry = DateTime.MinValue;

    public PayPalClient(HttpClient httpClient, IConfiguration configuration, ILogger<PayPalClient> logger)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<(string OrderId, string ApprovalUrl)> CreateOrderAsync(decimal amount, string currency, string referenceId, CancellationToken cancellationToken = default)
    {
        await EnsureAccessTokenAsync(cancellationToken);

        var requestBody = new
        {
            intent = "CAPTURE",
            purchase_units = new[]
            {
                new
                {
                    reference_id = referenceId,
                    amount = new
                    {
                        currency_code = currency,
                        value = amount.ToString("F2")
                    }
                }
            },
            payment_source = new
            {
                paypal = new
                {
                    experience_context = new
                    {
                        brand_name = "EcoStore",
                        landing_page = "LOGIN",
                        user_action = "PAY_NOW",
                        return_url = _configuration["PayPal:ReturnUrl"] ?? "http://localhost:4200/checkout/success",
                        cancel_url = _configuration["PayPal:CancelUrl"] ?? "http://localhost:4200/checkout/cancel"
                    }
                }
            }
        };

        var content = new StringContent(
            JsonSerializer.Serialize(requestBody),
            Encoding.UTF8,
            "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, "v2/checkout/orders");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
        request.Content = content;

        var response = await _httpClient.SendAsync(request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("PayPal CreateOrder failed: {Response}", responseBody);
            throw new InvalidOperationException($"PayPal order creation failed: {response.StatusCode}");
        }

        var orderResponse = JsonSerializer.Deserialize<PayPalOrderResponse>(responseBody);
        var approvalLink = orderResponse?.Links?.FirstOrDefault(l => l.Rel == "payer-action")?.Href
            ?? orderResponse?.Links?.FirstOrDefault(l => l.Rel == "approve")?.Href
            ?? "";

        return (orderResponse!.Id, approvalLink);
    }

    public async Task<PayPalCaptureResult> CaptureOrderAsync(string paypalOrderId, CancellationToken cancellationToken = default)
    {
        await EnsureAccessTokenAsync(cancellationToken);

        var request = new HttpRequestMessage(HttpMethod.Post, $"v2/checkout/orders/{paypalOrderId}/capture");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
        request.Content = new StringContent("", Encoding.UTF8, "application/json");

        var response = await _httpClient.SendAsync(request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("PayPal Capture failed: {Response}", responseBody);
            return new PayPalCaptureResult { Success = false, ErrorMessage = $"Capture failed: {response.StatusCode}" };
        }

        var captureResponse = JsonSerializer.Deserialize<PayPalCaptureResponse>(responseBody);
        var capture = captureResponse?.PurchaseUnits?.FirstOrDefault()?.Payments?.Captures?.FirstOrDefault();

        return new PayPalCaptureResult
        {
            Success = true,
            CaptureId = capture?.Id ?? paypalOrderId,
            PayerEmail = captureResponse?.Payer?.EmailAddress,
            PayerId = captureResponse?.Payer?.PayerId
        };
    }

    public async Task<PayPalRefundResult> RefundCaptureAsync(string captureId, decimal? amount, string currency, CancellationToken cancellationToken = default)
    {
        await EnsureAccessTokenAsync(cancellationToken);

        object? requestBody = amount.HasValue
            ? new { amount = new { value = amount.Value.ToString("F2"), currency_code = currency } }
            : null;

        var request = new HttpRequestMessage(HttpMethod.Post, $"v2/payments/captures/{captureId}/refund");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
        request.Content = new StringContent(
            requestBody is not null ? JsonSerializer.Serialize(requestBody) : "{}",
            Encoding.UTF8,
            "application/json");

        var response = await _httpClient.SendAsync(request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("PayPal Refund failed: {Response}", responseBody);
            return new PayPalRefundResult { Success = false, ErrorMessage = $"Refund failed: {response.StatusCode}" };
        }

        var refundResponse = JsonSerializer.Deserialize<PayPalRefundResponse>(responseBody);

        return new PayPalRefundResult
        {
            Success = true,
            RefundId = refundResponse?.Id
        };
    }

    private async Task EnsureAccessTokenAsync(CancellationToken cancellationToken)
    {
        if (_accessToken is not null && DateTime.UtcNow < _tokenExpiry)
            return;

        var clientId = _configuration["PayPal:ClientId"]
            ?? throw new InvalidOperationException("PayPal:ClientId not configured");
        var clientSecret = _configuration["PayPal:ClientSecret"]
            ?? throw new InvalidOperationException("PayPal:ClientSecret not configured");

        var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

        var request = new HttpRequestMessage(HttpMethod.Post, "v1/oauth2/token");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        request.Content = new FormUrlEncodedContent(new[] { new KeyValuePair<string, string>("grant_type", "client_credentials") });

        var response = await _httpClient.SendAsync(request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
            throw new InvalidOperationException($"Failed to get PayPal access token: {response.StatusCode}");

        var tokenResponse = JsonSerializer.Deserialize<PayPalTokenResponse>(responseBody);
        _accessToken = tokenResponse!.AccessToken;
        _tokenExpiry = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn - 60); // 60s buffer
    }
}

// PayPal API response models
internal class PayPalTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = default!;

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
}

internal class PayPalOrderResponse
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = default!;

    [JsonPropertyName("links")]
    public List<PayPalLink>? Links { get; set; }
}

internal class PayPalLink
{
    [JsonPropertyName("href")]
    public string Href { get; set; } = default!;

    [JsonPropertyName("rel")]
    public string Rel { get; set; } = default!;
}

internal class PayPalCaptureResponse
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = default!;

    [JsonPropertyName("purchase_units")]
    public List<PayPalPurchaseUnit>? PurchaseUnits { get; set; }

    [JsonPropertyName("payer")]
    public PayPalPayer? Payer { get; set; }
}

internal class PayPalPurchaseUnit
{
    [JsonPropertyName("payments")]
    public PayPalPayments? Payments { get; set; }
}

internal class PayPalPayments
{
    [JsonPropertyName("captures")]
    public List<PayPalCapture>? Captures { get; set; }
}

internal class PayPalCapture
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = default!;
}

internal class PayPalPayer
{
    [JsonPropertyName("email_address")]
    public string? EmailAddress { get; set; }

    [JsonPropertyName("payer_id")]
    public string? PayerId { get; set; }
}

internal class PayPalRefundResponse
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = default!;
}
