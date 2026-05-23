using ECommerce.Modules.Catalog.Domain.Enums;
using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Catalog.Domain.Entities;

public class Product : AggregateRoot
{
    public string Name { get; private set; } = default!;
    public string Slug { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public string ShortDescription { get; private set; } = default!;
    public decimal Price { get; private set; }
    public decimal? CompareAtPrice { get; private set; }
    public decimal? SalePrice { get; private set; }
    public string Sku { get; private set; } = default!;
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = default!;
    public ProductStatus Status { get; private set; } = ProductStatus.Draft;
    public bool IsActive { get; private set; } = true;
    public bool IsFeatured { get; private set; }
    public string? MainImageUrl { get; private set; }
    public string? Tags { get; private set; }
    public string? Brand { get; private set; }
    public int SortOrder { get; private set; }
    public string? MetaTitle { get; private set; }
    public string? MetaDescription { get; private set; }

    private readonly List<ProductImage> _images = [];
    public IReadOnlyCollection<ProductImage> Images => _images.AsReadOnly();

    private readonly List<ProductAttribute> _attributes = [];
    public IReadOnlyCollection<ProductAttribute> Attributes => _attributes.AsReadOnly();

    private readonly List<ProductMedia> _media = [];
    public IReadOnlyCollection<ProductMedia> Media => _media.AsReadOnly();

    private readonly List<ProductVariant> _variants = [];
    public IReadOnlyCollection<ProductVariant> Variants => _variants.AsReadOnly();

    private Product() { } // EF Core

    public static Product Create(
        string name,
        string description,
        string shortDescription,
        decimal price,
        string sku,
        Guid categoryId,
        decimal? compareAtPrice = null,
        decimal? salePrice = null,
        string? mainImageUrl = null,
        bool isFeatured = false,
        string? tags = null,
        string? brand = null,
        ProductStatus status = ProductStatus.Draft)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Product name is required.", nameof(name));

        if (price < 0)
            throw new ArgumentException("Product price cannot be negative.", nameof(price));

        if (string.IsNullOrWhiteSpace(sku))
            throw new ArgumentException("Product SKU is required.", nameof(sku));

        var product = new Product
        {
            Name = name.Trim(),
            Slug = GenerateSlug(name),
            Description = description,
            ShortDescription = shortDescription,
            Price = price,
            CompareAtPrice = compareAtPrice,
            SalePrice = salePrice,
            Sku = sku.Trim().ToUpperInvariant(),
            CategoryId = categoryId,
            MainImageUrl = mainImageUrl,
            IsFeatured = isFeatured,
            Tags = tags,
            Brand = brand,
            Status = status,
            IsActive = status == ProductStatus.Active || status == ProductStatus.OnSale
        };

        return product;
    }

    public void Update(
        string name,
        string description,
        string shortDescription,
        decimal price,
        string sku,
        Guid categoryId,
        decimal? compareAtPrice = null,
        decimal? salePrice = null,
        string? mainImageUrl = null,
        bool isFeatured = false,
        string? tags = null,
        string? brand = null)
    {
        Name = name.Trim();
        Slug = GenerateSlug(name);
        Description = description;
        ShortDescription = shortDescription;
        Price = price;
        CompareAtPrice = compareAtPrice;
        SalePrice = salePrice;
        Sku = sku.Trim().ToUpperInvariant();
        CategoryId = categoryId;
        MainImageUrl = mainImageUrl;
        IsFeatured = isFeatured;
        Tags = tags;
        Brand = brand;
        SetUpdated();
    }

    public void SetStatus(ProductStatus status)
    {
        Status = status;
        IsActive = status == ProductStatus.Active || status == ProductStatus.OnSale;
        SetUpdated();
    }

    public void Activate() { SetStatus(ProductStatus.Active); }
    public void Deactivate() { SetStatus(ProductStatus.Draft); }
    public void MarkOnSale(decimal salePrice) { SalePrice = salePrice; SetStatus(ProductStatus.OnSale); }
    public void MarkOutOfStock() { SetStatus(ProductStatus.OutOfStock); }
    public void Discontinue() { SetStatus(ProductStatus.Discontinued); }

    public void AddImage(string url, string? altText, int sortOrder)
    {
        _images.Add(ProductImage.Create(Id, url, altText, sortOrder));
        SetUpdated();
    }

    public void AddAttribute(string name, string value)
    {
        _attributes.Add(ProductAttribute.Create(Id, name, value));
        SetUpdated();
    }

    public void ClearAttributes()
    {
        _attributes.Clear();
        SetUpdated();
    }

    public void AddMedia(ProductMedia media)
    {
        _media.Add(media);
        SetUpdated();
    }

    public void ClearMedia()
    {
        _media.Clear();
        SetUpdated();
    }

    public void AddVariant(ProductVariant variant)
    {
        _variants.Add(variant);
        SetUpdated();
    }

    public void ClearVariants()
    {
        _variants.Clear();
        SetUpdated();
    }

    private static string GenerateSlug(string name)
    {
        return name.ToLowerInvariant()
            .Replace(" ", "-")
            .Replace("--", "-")
            .Trim('-');
    }
}
