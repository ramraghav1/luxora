using ECommerce.Modules.Catalog.Domain.Enums;
using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Catalog.Domain.Entities;

public class ProductMedia : BaseEntity
{
    public Guid ProductId { get; private set; }
    public string Url { get; private set; } = default!;
    public MediaType Type { get; private set; }
    public string? AltText { get; private set; }
    public string? ThumbnailUrl { get; private set; }
    public int SortOrder { get; private set; }
    public bool IsPrimary { get; private set; }

    private ProductMedia() { }

    public static ProductMedia Create(Guid productId, string url, MediaType type, string? altText = null, string? thumbnailUrl = null, int sortOrder = 0, bool isPrimary = false)
    {
        return new ProductMedia
        {
            ProductId = productId,
            Url = url,
            Type = type,
            AltText = altText,
            ThumbnailUrl = thumbnailUrl,
            SortOrder = sortOrder,
            IsPrimary = isPrimary
        };
    }

    public void Update(string url, string? altText, string? thumbnailUrl, int sortOrder, bool isPrimary)
    {
        Url = url;
        AltText = altText;
        ThumbnailUrl = thumbnailUrl;
        SortOrder = sortOrder;
        IsPrimary = isPrimary;
        SetUpdated();
    }
}
