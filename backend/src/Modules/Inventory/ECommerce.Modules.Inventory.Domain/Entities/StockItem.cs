using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Inventory.Domain.Entities;

public class StockItem : AggregateRoot
{
    public Guid ProductId { get; private set; }
    public string Sku { get; private set; } = default!;
    public int QuantityOnHand { get; private set; }
    public int QuantityReserved { get; private set; }
    public int ReorderLevel { get; private set; }
    public int ReorderQuantity { get; private set; }
    public bool IsInStock => AvailableQuantity > 0;
    public int AvailableQuantity => QuantityOnHand - QuantityReserved;
    public bool NeedsReorder => AvailableQuantity <= ReorderLevel;

    private StockItem() { }

    public static StockItem Create(Guid productId, string sku, int initialQuantity, int reorderLevel = 10, int reorderQuantity = 50)
    {
        return new StockItem
        {
            ProductId = productId,
            Sku = sku,
            QuantityOnHand = initialQuantity,
            ReorderLevel = reorderLevel,
            ReorderQuantity = reorderQuantity
        };
    }

    public void AddStock(int quantity) { QuantityOnHand += quantity; SetUpdated(); }

    public void Reserve(int quantity)
    {
        if (quantity > AvailableQuantity) throw new InvalidOperationException("Insufficient stock.");
        QuantityReserved += quantity; SetUpdated();
    }

    public void ReleaseReservation(int quantity) { QuantityReserved = Math.Max(0, QuantityReserved - quantity); SetUpdated(); }
    public void Deduct(int quantity) { QuantityOnHand -= quantity; QuantityReserved = Math.Max(0, QuantityReserved - quantity); SetUpdated(); }
}
