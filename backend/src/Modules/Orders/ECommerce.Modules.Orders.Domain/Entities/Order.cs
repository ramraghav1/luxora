using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Orders.Domain.Entities;

public class Order : AggregateRoot
{
    public string OrderNumber { get; private set; } = default!;
    public Guid CustomerId { get; private set; }
    public OrderStatus Status { get; private set; } = OrderStatus.Pending;
    public decimal SubTotal { get; private set; }
    public decimal TaxAmount { get; private set; }
    public decimal ShippingAmount { get; private set; }
    public decimal DiscountAmount { get; private set; }
    public decimal TotalAmount { get; private set; }
    public string? CouponCode { get; private set; }

    // Shipping Address
    public string ShippingFirstName { get; private set; } = default!;
    public string ShippingLastName { get; private set; } = default!;
    public string ShippingAddress1 { get; private set; } = default!;
    public string? ShippingAddress2 { get; private set; }
    public string ShippingCity { get; private set; } = default!;
    public string ShippingState { get; private set; } = default!;
    public string ShippingPostalCode { get; private set; } = default!;
    public string ShippingCountry { get; private set; } = default!;
    public string ShippingPhone { get; private set; } = default!;

    private readonly List<OrderItem> _items = [];
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    private Order() { }

    public static Order Create(Guid customerId, string shippingFirstName, string shippingLastName,
        string shippingAddress1, string shippingCity, string shippingState,
        string shippingPostalCode, string shippingCountry, string shippingPhone,
        string? shippingAddress2 = null)
    {
        return new Order
        {
            OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..8].ToUpper()}",
            CustomerId = customerId,
            ShippingFirstName = shippingFirstName,
            ShippingLastName = shippingLastName,
            ShippingAddress1 = shippingAddress1,
            ShippingAddress2 = shippingAddress2,
            ShippingCity = shippingCity,
            ShippingState = shippingState,
            ShippingPostalCode = shippingPostalCode,
            ShippingCountry = shippingCountry,
            ShippingPhone = shippingPhone
        };
    }

    public void AddItem(Guid productId, string productName, decimal unitPrice, int quantity, string? imageUrl = null)
    {
        _items.Add(OrderItem.Create(Id, productId, productName, unitPrice, quantity, imageUrl));
        RecalculateTotals();
    }

    public void UpdateStatus(OrderStatus newStatus) { Status = newStatus; SetUpdated(); }
    public void ApplyCoupon(string code, decimal discount) { CouponCode = code; DiscountAmount = discount; RecalculateTotals(); }
    public void SetShipping(decimal amount) { ShippingAmount = amount; RecalculateTotals(); }
    public void SetTax(decimal amount) { TaxAmount = amount; RecalculateTotals(); }

    private void RecalculateTotals()
    {
        SubTotal = _items.Sum(i => i.TotalPrice);
        TotalAmount = SubTotal + TaxAmount + ShippingAmount - DiscountAmount;
        SetUpdated();
    }
}

public enum OrderStatus
{
    Pending = 0,
    Confirmed = 1,
    Processing = 2,
    Shipped = 3,
    Delivered = 4,
    Cancelled = 5,
    Refunded = 6
}
