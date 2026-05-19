using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Catalog.Domain.Entities;

public class Category : AggregateRoot
{
    public string Name { get; private set; } = default!;
    public string Slug { get; private set; } = default!;
    public string? Description { get; private set; }
    public string? ImageUrl { get; private set; }
    public Guid? ParentCategoryId { get; private set; }
    public Category? ParentCategory { get; private set; }
    public bool IsActive { get; private set; } = true;
    public int SortOrder { get; private set; }
    public string? MetaTitle { get; private set; }
    public string? MetaDescription { get; private set; }

    private readonly List<Category> _subCategories = [];
    public IReadOnlyCollection<Category> SubCategories => _subCategories.AsReadOnly();

    private readonly List<Product> _products = [];
    public IReadOnlyCollection<Product> Products => _products.AsReadOnly();

    private Category() { }

    public static Category Create(
        string name,
        string? description = null,
        string? imageUrl = null,
        Guid? parentCategoryId = null,
        int sortOrder = 0)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Category name is required.", nameof(name));

        return new Category
        {
            Name = name.Trim(),
            Slug = name.ToLowerInvariant().Replace(" ", "-").Replace("--", "-").Trim('-'),
            Description = description,
            ImageUrl = imageUrl,
            ParentCategoryId = parentCategoryId,
            SortOrder = sortOrder
        };
    }

    public void Update(string name, string? description, string? imageUrl, Guid? parentCategoryId, int sortOrder)
    {
        Name = name.Trim();
        Slug = name.ToLowerInvariant().Replace(" ", "-").Replace("--", "-").Trim('-');
        Description = description;
        ImageUrl = imageUrl;
        ParentCategoryId = parentCategoryId;
        SortOrder = sortOrder;
        SetUpdated();
    }

    public void Activate() { IsActive = true; SetUpdated(); }
    public void Deactivate() { IsActive = false; SetUpdated(); }
}
