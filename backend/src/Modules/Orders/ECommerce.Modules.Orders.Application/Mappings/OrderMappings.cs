using ECommerce.Modules.Orders.Application.DTOs;
using ECommerce.Modules.Orders.Domain.Entities;

namespace ECommerce.Modules.Orders.Application.Mappings;

public static class OrderMappings
{
    public static OrderDto ToDto(this Order order) => new()
    {
        Id = order.Id,
        OrderNumber = order.OrderNumber,
        CustomerId = order.CustomerId,
        Status = order.Status.ToString(),
        SubTotal = order.SubTotal,
        TaxAmount = order.TaxAmount,
        ShippingAmount = order.ShippingAmount,
        DiscountAmount = order.DiscountAmount,
        TotalAmount = order.TotalAmount,
        CouponCode = order.CouponCode,
        ShippingAddress = new ShippingAddressDto
        {
            FirstName = order.ShippingFirstName,
            LastName = order.ShippingLastName,
            Address1 = order.ShippingAddress1,
            Address2 = order.ShippingAddress2,
            City = order.ShippingCity,
            State = order.ShippingState,
            PostalCode = order.ShippingPostalCode,
            Country = order.ShippingCountry,
            Phone = order.ShippingPhone
        },
        Items = order.Items.Select(i => i.ToDto()).ToList(),
        CreatedAt = order.CreatedAt,
        UpdatedAt = order.UpdatedAt
    };

    public static OrderItemDto ToDto(this OrderItem item) => new()
    {
        Id = item.Id,
        ProductId = item.ProductId,
        ProductName = item.ProductName,
        ImageUrl = item.ImageUrl,
        UnitPrice = item.UnitPrice,
        Quantity = item.Quantity,
        TotalPrice = item.TotalPrice
    };
}
