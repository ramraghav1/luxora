using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Catalog.Domain.Entities;

public class ProductAttribute : BaseEntity
{
    public Guid ProductId { get; private set; }
    public string Name { get; private set; } = default!;
    public string Value { get; private set; } = default!;

    private ProductAttribute() { }

    public static ProductAttribute Create(Guid productId, string name, string value)
    {
        return new ProductAttribute
        {
            ProductId = productId,
            Name = name,
            Value = value
        };
    }
}
