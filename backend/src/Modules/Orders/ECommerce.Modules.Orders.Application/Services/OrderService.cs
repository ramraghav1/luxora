using ECommerce.Modules.Orders.Application.DTOs;
using ECommerce.Modules.Orders.Application.Interfaces;
using ECommerce.Modules.Orders.Application.Mappings;
using ECommerce.Modules.Orders.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Orders.Application.Services;

public sealed class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<Result<OrderDto>> CreateOrderAsync(Guid customerId, CreateOrderRequest request, CancellationToken cancellationToken = default)
    {
        if (request.Items.Count == 0)
            return Result<OrderDto>.Failure("Order must contain at least one item.");

        var address = request.ShippingAddress;
        var order = Order.Create(
            customerId,
            address.FirstName, address.LastName,
            address.Address1, address.City, address.State,
            address.PostalCode, address.Country, address.Phone,
            address.Address2);

        foreach (var item in request.Items)
        {
            order.AddItem(item.ProductId, item.ProductName, item.UnitPrice, item.Quantity, item.ImageUrl);
        }

        // Apply tax (10% estimate)
        order.SetTax(order.SubTotal * 0.10m);

        await _orderRepository.AddAsync(order, cancellationToken);

        var created = await _orderRepository.GetByIdAsync(order.Id, cancellationToken);
        return Result<OrderDto>.Success(created!.ToDto());
    }

    public async Task<Result<OrderDto>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var order = await _orderRepository.GetByIdAsync(id, cancellationToken);
        if (order is null)
            return Result<OrderDto>.Failure("Order not found.");

        return Result<OrderDto>.Success(order.ToDto());
    }

    public async Task<Result<IReadOnlyList<OrderDto>>> GetByCustomerIdAsync(Guid customerId, CancellationToken cancellationToken = default)
    {
        var orders = await _orderRepository.GetByCustomerIdAsync(customerId, cancellationToken);
        var dtos = orders.Select(o => o.ToDto()).ToList() as IReadOnlyList<OrderDto>;
        return Result<IReadOnlyList<OrderDto>>.Success(dtos);
    }

    public async Task<Result<OrderDto>> UpdateStatusAsync(Guid id, string status, CancellationToken cancellationToken = default)
    {
        var order = await _orderRepository.GetByIdAsync(id, cancellationToken);
        if (order is null)
            return Result<OrderDto>.Failure("Order not found.");

        if (!Enum.TryParse<OrderStatus>(status, true, out var orderStatus))
            return Result<OrderDto>.Failure($"Invalid order status: {status}");

        order.UpdateStatus(orderStatus);
        await _orderRepository.UpdateAsync(order, cancellationToken);

        return Result<OrderDto>.Success(order.ToDto());
    }
}
