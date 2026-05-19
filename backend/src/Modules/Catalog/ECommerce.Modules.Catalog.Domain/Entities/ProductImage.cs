using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Catalog.Domain.Entities;

public class ProductImage : BaseEntity
{
    public Guid ProductId { get; private set; }
    public string Url { get; private set; } = default!;
    public string? AltText { get; private set; }
    public int SortOrder { get; private set; }

    private ProductImage() { }

    public static ProductImage Create(Guid productId, string url, string? altText, int sortOrder)
    {
        return new ProductImage
        {
            ProductId = productId,
            Url = url,
            AltText = altText,
            SortOrder = sortOrder
        };
    }
}
