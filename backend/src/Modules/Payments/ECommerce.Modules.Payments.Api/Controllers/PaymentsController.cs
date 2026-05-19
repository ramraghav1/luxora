using ECommerce.Modules.Payments.Application.DTOs;
using ECommerce.Modules.Payments.Application.Interfaces;
using ECommerce.SharedKernel.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Modules.Payments.Api.Controllers;

[ApiController]
[Route("api/payments")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    /// <summary>
    /// Create a PayPal order and get the approval URL for the customer to authorize payment
    /// </summary>
    [HttpPost("paypal/create-order")]
    public async Task<IActionResult> CreatePayPalOrder(
        [FromBody] CreatePayPalOrderRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _paymentService.CreatePayPalOrderAsync(request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<PayPalOrderResponse>.Ok(result.Value!));
    }

    /// <summary>
    /// Capture a PayPal order after the customer has approved the payment
    /// </summary>
    [HttpPost("paypal/capture-order")]
    public async Task<IActionResult> CapturePayPalOrder(
        [FromBody] CapturePayPalOrderRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _paymentService.CapturePayPalOrderAsync(request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<PaymentDto>.Ok(result.Value!));
    }

    /// <summary>
    /// Refund a payment (admin only)
    /// </summary>
    [HttpPost("refund")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RefundPayment(
        [FromBody] RefundPaymentRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _paymentService.RefundPaymentAsync(request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<PaymentDto>.Ok(result.Value!));
    }

    /// <summary>
    /// Get payment by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetPayment(Guid id, CancellationToken cancellationToken)
    {
        var result = await _paymentService.GetByIdAsync(id, cancellationToken);
        if (!result.IsSuccess)
            return NotFound(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<PaymentDto>.Ok(result.Value!));
    }

    /// <summary>
    /// Get payment by order ID
    /// </summary>
    [HttpGet("order/{orderId:guid}")]
    public async Task<IActionResult> GetPaymentByOrder(Guid orderId, CancellationToken cancellationToken)
    {
        var result = await _paymentService.GetByOrderIdAsync(orderId, cancellationToken);
        if (!result.IsSuccess)
            return NotFound(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<PaymentDto>.Ok(result.Value!));
    }

    /// <summary>
    /// Get vouchers (receipts) for an order
    /// </summary>
    [HttpGet("vouchers/order/{orderId:guid}")]
    public async Task<IActionResult> GetVouchersForOrder(Guid orderId, CancellationToken cancellationToken)
    {
        var result = await _paymentService.GetVouchersForOrderAsync(orderId, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<object>.Ok(result.Value!));
    }
}
