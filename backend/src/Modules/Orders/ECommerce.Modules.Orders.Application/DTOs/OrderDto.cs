namespace ECommerce.Modules.Orders.Application.DTOs;

public record OrderDto
{
    public Guid Id { get; init; }
    public string OrderNumber { get; init; } = default!;
    public Guid CustomerId { get; init; }
    public string Status { get; init; } = default!;
    public decimal SubTotal { get; init; }
    public decimal TaxAmount { get; init; }
    public decimal ShippingAmount { get; init; }
    public decimal DiscountAmount { get; init; }
    public decimal TotalAmount { get; init; }
    public string? CouponCode { get; init; }
    public ShippingAddressDto ShippingAddress { get; init; } = default!;
    public List<OrderItemDto> Items { get; init; } = [];
    public string? PaymentStatus { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}

public record ShippingAddressDto
{
    public string FirstName { get; init; } = default!;
    public string LastName { get; init; } = default!;
    public string Address1 { get; init; } = default!;
    public string? Address2 { get; init; }
    public string City { get; init; } = default!;
    public string State { get; init; } = default!;
    public string PostalCode { get; init; } = default!;
    public string Country { get; init; } = default!;
    public string Phone { get; init; } = default!;
}

public record OrderItemDto
{
    public Guid Id { get; init; }
    public Guid ProductId { get; init; }
    public string ProductName { get; init; } = default!;
    public string? ImageUrl { get; init; }
    public decimal UnitPrice { get; init; }
    public int Quantity { get; init; }
    public decimal TotalPrice { get; init; }
}

public record CreateOrderRequest
{
    public List<CreateOrderItemRequest> Items { get; init; } = [];
    public ShippingAddressDto ShippingAddress { get; init; } = default!;
    public string? CouponCode { get; init; }
}

public record CreateOrderItemRequest
{
    public Guid ProductId { get; init; }
    public string ProductName { get; init; } = default!;
    public string? ImageUrl { get; init; }
    public decimal UnitPrice { get; init; }
    public int Quantity { get; init; }
}
