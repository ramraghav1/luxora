using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Cart.Domain.Entities;

public class ShoppingCart : AggregateRoot
{
    public Guid CustomerId { get; private set; }

    private readonly List<CartItem> _items = [];
    public IReadOnlyCollection<CartItem> Items => _items.AsReadOnly();
    public decimal TotalAmount => _items.Sum(i => i.TotalPrice);
    public int TotalItems => _items.Sum(i => i.Quantity);

    private ShoppingCart() { }

    public static ShoppingCart Create(Guid customerId) => new() { CustomerId = customerId };

    public void AddItem(Guid productId, string productName, decimal unitPrice, int quantity, string? imageUrl = null)
    {
        var existing = _items.FirstOrDefault(i => i.ProductId == productId);
        if (existing is not null)
        {
            existing.UpdateQuantity(existing.Quantity + quantity);
        }
        else
        {
            _items.Add(CartItem.Create(Id, productId, productName, unitPrice, quantity, imageUrl));
        }
        SetUpdated();
    }

    public void UpdateItemQuantity(Guid productId, int quantity)
    {
        var item = _items.FirstOrDefault(i => i.ProductId == productId)
            ?? throw new InvalidOperationException("Item not in cart.");
        if (quantity <= 0) _items.Remove(item);
        else item.UpdateQuantity(quantity);
        SetUpdated();
    }

    public void RemoveItem(Guid productId)
    {
        var item = _items.FirstOrDefault(i => i.ProductId == productId);
        if (item is not null) { _items.Remove(item); SetUpdated(); }
    }

    public void Clear() { _items.Clear(); SetUpdated(); }
}
