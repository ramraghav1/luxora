using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_102)]
public class M102_SeedBulkProducts : Migration
{
    public override void Up()
    {
        var handbagsId = Guid.Parse("a1b2c3d4-0001-0001-0002-000000000001");
        var backpacksId = Guid.Parse("a1b2c3d4-0001-0001-0003-000000000001");
        var luggageId = Guid.Parse("a1b2c3d4-0001-0001-0004-000000000001");
        var crossbodyId = Guid.Parse("a1b2c3d4-0001-0001-0005-000000000001");
        var toteId = Guid.Parse("a1b2c3d4-0001-0001-0006-000000000001");

        var categories = new[]
        {
            new { Id = handbagsId, Prefix = "HB", Name = "Handbag", Slug = "handbag" },
            new { Id = backpacksId, Prefix = "BP", Name = "Backpack", Slug = "backpack" },
            new { Id = luggageId, Prefix = "LG", Name = "Luggage", Slug = "luggage" },
            new { Id = crossbodyId, Prefix = "CB", Name = "Crossbody", Slug = "crossbody" },
            new { Id = toteId, Prefix = "TT", Name = "Tote", Slug = "tote" }
        };

        var colors = new[] { "Black", "Brown", "Tan", "Navy", "Olive", "Burgundy", "Cream", "Gray", "Camel", "Forest Green" };
        var materials = new[] { "Vegan Leather", "Canvas", "Recycled Nylon", "Cork", "Hemp", "Organic Cotton", "Jute", "Bamboo Fiber", "Pinatex", "Recycled PET" };
        var styles = new[] { "Classic", "Modern", "Vintage", "Minimalist", "Bohemian", "Urban", "Travel", "Sport", "Luxury", "Casual" };
        var features = new[] { "Water-Resistant", "Laptop Sleeve", "RFID Blocking", "Expandable", "Lightweight", "Padded Straps", "Anti-Theft", "USB Charging", "Reflective", "Convertible" };

        var bgColors = new[] { "2d6a4f", "40916c", "52b788", "1b4332", "95d5b2", "74c69d", "344e41", "588157", "3a5a40", "a3b18a" };

        var random = new Random(42); // Fixed seed for reproducibility
        var now = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc);

        foreach (var category in categories)
        {
            for (int i = 1; i <= 500; i++)
            {
                var color = colors[random.Next(colors.Length)];
                var material = materials[random.Next(materials.Length)];
                var style = styles[random.Next(styles.Length)];
                var feature = features[random.Next(features.Length)];
                var bgColor = bgColors[random.Next(bgColors.Length)];

                var productName = $"{color} {material} {style} {category.Name}";
                var productSlug = $"{category.Slug}-{style.ToLower()}-{color.ToLower().Replace(" ", "-")}-{i:D4}";
                var sku = $"{category.Prefix}-BULK-{i:D4}";
                var price = Math.Round((decimal)(random.NextDouble() * 250 + 25), 2); // $25 - $275
                var hasComparePrice = random.Next(3) == 0; // 33% chance of sale
                var compareAtPrice = hasComparePrice ? Math.Round(price * (decimal)(1.2 + random.NextDouble() * 0.5), 2) : (decimal?)null;
                var isFeatured = random.Next(10) == 0; // 10% featured
                var createdAt = now.AddDays(-random.Next(365)).AddHours(random.Next(24));
                var imageId = (random.Next(1000) + 1);

                // Use picsum.photos for real product-like images
                var imageUrl = $"https://picsum.photos/seed/{category.Prefix}{i}/600/750";

                Execute.Sql($@"
                    INSERT INTO catalog.products (id, name, slug, description, short_description, price, compare_at_price, sku, category_id, is_active, is_featured, main_image_url, sort_order, created_at, updated_at)
                    VALUES (
                        '{Guid.NewGuid()}',
                        '{EscapeSql(productName)}',
                        '{EscapeSql(productSlug)}',
                        '{EscapeSql($"Premium {material.ToLower()} {category.Name.ToLower()} in {color.ToLower()}. Features {feature.ToLower()} design with sustainable craftsmanship. {style} style perfect for any occasion. Made with eco-conscious materials and ethical manufacturing processes.")}',
                        '{EscapeSql($"{style} {color.ToLower()} {material.ToLower()} {category.Name.ToLower()} with {feature.ToLower()}")}',
                        {price},
                        {(compareAtPrice.HasValue ? compareAtPrice.Value.ToString("F2") : "NULL")},
                        '{sku}',
                        '{category.Id}',
                        true,
                        {isFeatured.ToString().ToLower()},
                        '{imageUrl}',
                        {i},
                        '{createdAt:yyyy-MM-dd HH:mm:ss}',
                        '{createdAt:yyyy-MM-dd HH:mm:ss}'
                    );");
            }
        }
    }

    public override void Down()
    {
        Execute.Sql("DELETE FROM catalog.products WHERE sku LIKE '%-BULK-%';");
    }

    private static string EscapeSql(string input)
    {
        return input.Replace("'", "''");
    }
}
