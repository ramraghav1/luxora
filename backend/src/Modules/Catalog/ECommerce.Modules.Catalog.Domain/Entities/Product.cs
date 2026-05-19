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
    public string Sku { get; private set; } = default!;
    public Guid CategoryId { get; private set; }
    public Category Category { get; private set; } = default!;
    public bool IsActive { get; private set; } = true;
    public bool IsFeatured { get; private set; }
    public string? MainImageUrl { get; private set; }
    public int SortOrder { get; private set; }
    public string? MetaTitle { get; private set; }
    public string? MetaDescription { get; private set; }

    private readonly List<ProductImage> _images = [];
    public IReadOnlyCollection<ProductImage> Images => _images.AsReadOnly();

    private readonly List<ProductAttribute> _attributes = [];
    public IReadOnlyCollection<ProductAttribute> Attributes => _attributes.AsReadOnly();

    private Product() { } // EF Core

    public static Product Create(
        string name,
        string description,
        string shortDescription,
        decimal price,
        string sku,
        Guid categoryId,
        decimal? compareAtPrice = null,
        string? mainImageUrl = null,
        bool isFeatured = false)
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
            Sku = sku.Trim().ToUpperInvariant(),
            CategoryId = categoryId,
            MainImageUrl = mainImageUrl,
            IsFeatured = isFeatured
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
        string? mainImageUrl = null,
        bool isFeatured = false)
    {
        Name = name.Trim();
        Slug = GenerateSlug(name);
        Description = description;
        ShortDescription = shortDescription;
        Price = price;
        CompareAtPrice = compareAtPrice;
        Sku = sku.Trim().ToUpperInvariant();
        CategoryId = categoryId;
        MainImageUrl = mainImageUrl;
        IsFeatured = isFeatured;
        SetUpdated();
    }

    public void Activate() { IsActive = true; SetUpdated(); }
    public void Deactivate() { IsActive = false; SetUpdated(); }

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

    private static string GenerateSlug(string name)
    {
        return name.ToLowerInvariant()
            .Replace(" ", "-")
            .Replace("--", "-")
            .Trim('-');
    }
}
