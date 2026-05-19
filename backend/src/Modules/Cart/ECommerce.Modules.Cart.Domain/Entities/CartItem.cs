using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Cart.Domain.Entities;

public class CartItem : BaseEntity
{
    public Guid CartId { get; private set; }
    public Guid ProductId { get; private set; }
    public string ProductName { get; private set; } = default!;
    public string? ImageUrl { get; private set; }
    public decimal UnitPrice { get; private set; }
    public int Quantity { get; private set; }
    public decimal TotalPrice => UnitPrice * Quantity;

    private CartItem() { }

    public static CartItem Create(Guid cartId, Guid productId, string productName, decimal unitPrice, int quantity, string? imageUrl = null)
    {
        return new CartItem
        {
            CartId = cartId,
            ProductId = productId,
            ProductName = productName,
            UnitPrice = unitPrice,
            Quantity = quantity,
            ImageUrl = imageUrl
        };
    }

    public void UpdateQuantity(int quantity)
    {
        if (quantity < 0) throw new ArgumentException("Quantity cannot be negative.");
        Quantity = quantity;
        SetUpdated();
    }
}
