using ECommerce.Modules.Orders.Application.DTOs;
using ECommerce.Modules.Orders.Application.Interfaces;
using ECommerce.SharedKernel.Api;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.Modules.Orders.Api.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    /// <summary>
    /// Create a new order
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateOrder(
        [FromBody] CreateOrderRequest request,
        CancellationToken cancellationToken)
    {
        // Get customer ID from JWT claim or use a guest ID
        var customerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var customerId = customerIdClaim is not null ? Guid.Parse(customerIdClaim) : Guid.NewGuid();

        var result = await _orderService.CreateOrderAsync(customerId, request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return CreatedAtAction(nameof(GetOrder), new { id = result.Value!.Id }, ApiResponse<OrderDto>.Ok(result.Value));
    }

    /// <summary>
    /// Get order by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetOrder(Guid id, CancellationToken cancellationToken)
    {
        var result = await _orderService.GetByIdAsync(id, cancellationToken);
        if (!result.IsSuccess)
            return NotFound(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<OrderDto>.Ok(result.Value!));
    }

    /// <summary>
    /// Get orders for current customer
    /// </summary>
    [HttpGet("my-orders")]
    public async Task<IActionResult> GetMyOrders(CancellationToken cancellationToken)
    {
        var customerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (customerIdClaim is null)
            return Unauthorized(ApiResponse.Fail("Not authenticated."));

        var customerId = Guid.Parse(customerIdClaim);
        var result = await _orderService.GetByCustomerIdAsync(customerId, cancellationToken);

        return Ok(ApiResponse<object>.Ok(result.Value!));
    }

    /// <summary>
    /// Update order status (admin)
    /// </summary>
    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(
        Guid id,
        [FromBody] UpdateOrderStatusRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _orderService.UpdateStatusAsync(id, request.Status, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<OrderDto>.Ok(result.Value!));
    }
}

public record UpdateOrderStatusRequest
{
    public string Status { get; init; } = default!;
}
