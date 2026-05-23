using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Catalog.Domain.Entities;

/// <summary>
/// Links products as color/style variants of each other.
/// If Product A (Black) is a variant of Product B (Brown), both reference the same VariantGroupId.
/// </summary>
public class ProductVariant : BaseEntity
{
    public Guid ProductId { get; private set; }
    public Product Product { get; private set; } = default!;
    public Guid VariantGroupId { get; private set; }
    public string ColorName { get; private set; } = default!;
    public string ColorHex { get; private set; } = default!;
    public int SortOrder { get; private set; }

    private ProductVariant() { }

    public static ProductVariant Create(Guid productId, Guid variantGroupId, string colorName, string colorHex, int sortOrder = 0)
    {
        return new ProductVariant
        {
            ProductId = productId,
            VariantGroupId = variantGroupId,
            ColorName = colorName,
            ColorHex = colorHex,
            SortOrder = sortOrder
        };
    }

    public void Update(string colorName, string colorHex, int sortOrder)
    {
        ColorName = colorName;
        ColorHex = colorHex;
        SortOrder = sortOrder;
        SetUpdated();
    }
}
