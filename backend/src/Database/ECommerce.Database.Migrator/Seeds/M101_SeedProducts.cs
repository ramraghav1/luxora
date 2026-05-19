using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_101)]
public class M101_SeedProducts : Migration
{
    public override void Up()
    {
        var handbagsId = Guid.Parse("a1b2c3d4-0001-0001-0002-000000000001");
        var backpacksId = Guid.Parse("a1b2c3d4-0001-0001-0003-000000000001");
        var luggageId = Guid.Parse("a1b2c3d4-0001-0001-0004-000000000001");
        var crossbodyId = Guid.Parse("a1b2c3d4-0001-0001-0005-000000000001");
        var toteId = Guid.Parse("a1b2c3d4-0001-0001-0006-000000000001");

        var now = DateTime.UtcNow;

        // Handbags
        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0001-000000000001"),
            name = "EcoLeather Classic Tote",
            slug = "ecoleather-classic-tote",
            description = "A timeless tote crafted from sustainable vegan leather. Features organic cotton lining and recycled brass hardware. Perfect for everyday use with a conscious footprint.",
            short_description = "Sustainable vegan leather tote with organic cotton lining",
            price = 89.99m,
            compare_at_price = 120.00m,
            sku = "HB-ECO-001",
            category_id = handbagsId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/2d6a4f/ffffff?text=EcoLeather+Tote",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0001-000000000002"),
            name = "Bamboo Handle Clutch",
            slug = "bamboo-handle-clutch",
            description = "Elegant evening clutch featuring hand-polished bamboo handles and GOTS certified organic fabric. A statement piece that's as green as it is gorgeous.",
            short_description = "Organic fabric clutch with natural bamboo handles",
            price = 65.00m,
            compare_at_price = (decimal?)null,
            sku = "HB-BAM-002",
            category_id = handbagsId,
            is_active = true,
            is_featured = false,
            main_image_url = "https://placehold.co/600x750/40916c/ffffff?text=Bamboo+Clutch",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0001-000000000003"),
            name = "Recycled Ocean Satchel",
            slug = "recycled-ocean-satchel",
            description = "Made from 100% recycled ocean plastics. Each bag removes 2kg of waste from the sea. Water-resistant, durable, and stylishly structured.",
            short_description = "Structured satchel made from recycled ocean plastics",
            price = 110.00m,
            compare_at_price = 145.00m,
            sku = "HB-OCN-003",
            category_id = handbagsId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/1b4332/ffffff?text=Ocean+Satchel",
            created_at = now,
            updated_at = now
        });

        // Backpacks
        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0002-000000000001"),
            name = "Hemp Explorer Backpack",
            slug = "hemp-explorer-backpack",
            description = "Adventure-ready backpack made from organic hemp canvas. Features padded laptop sleeve, multiple compartments, and YKK recycled zippers. Naturally antimicrobial.",
            short_description = "Organic hemp canvas backpack with laptop sleeve",
            price = 129.00m,
            compare_at_price = (decimal?)null,
            sku = "BP-HMP-001",
            category_id = backpacksId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/52b788/ffffff?text=Hemp+Backpack",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0002-000000000002"),
            name = "Cork Urban Pack",
            slug = "cork-urban-pack",
            description = "Sleek urban backpack crafted from Portuguese cork leather. Lightweight, waterproof, and naturally sustainable. Harvesting cork doesn't harm trees.",
            short_description = "Waterproof cork leather urban backpack",
            price = 155.00m,
            compare_at_price = 189.00m,
            sku = "BP-CRK-002",
            category_id = backpacksId,
            is_active = true,
            is_featured = false,
            main_image_url = "https://placehold.co/600x750/d4a373/ffffff?text=Cork+Pack",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0002-000000000003"),
            name = "Recycled Denim Daypack",
            slug = "recycled-denim-daypack",
            description = "Casual daypack made from upcycled denim jeans. Each piece is unique with its own character. Padded straps and reinforced bottom for daily comfort.",
            short_description = "Upcycled denim daypack — each one unique",
            price = 79.00m,
            compare_at_price = 99.00m,
            sku = "BP-DNM-003",
            category_id = backpacksId,
            is_active = true,
            is_featured = false,
            main_image_url = "https://placehold.co/600x750/457b9d/ffffff?text=Denim+Daypack",
            created_at = now,
            updated_at = now
        });

        // Luggage
        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0003-000000000001"),
            name = "Bamboo Hardshell Carry-On",
            slug = "bamboo-hardshell-carry-on",
            description = "Premium carry-on suitcase with bamboo fiber reinforced shell. 360° spinner wheels, TSA-approved lock, and expandable design. Lighter and stronger than traditional polycarbonate.",
            short_description = "Premium bamboo fiber carry-on with spinner wheels",
            price = 299.00m,
            compare_at_price = (decimal?)null,
            sku = "LG-BMB-001",
            category_id = luggageId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/2d6a4f/ffffff?text=Bamboo+CarryOn",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0003-000000000002"),
            name = "Organic Canvas Weekender",
            slug = "organic-canvas-weekender",
            description = "Spacious weekender bag in GOTS certified organic canvas. Vegetable-tanned leather accents and solid brass hardware. Built to last generations.",
            short_description = "GOTS organic canvas weekender with leather accents",
            price = 175.00m,
            compare_at_price = 220.00m,
            sku = "LG-CNV-002",
            category_id = luggageId,
            is_active = true,
            is_featured = false,
            main_image_url = "https://placehold.co/600x750/e9c46a/333333?text=Canvas+Weekender",
            created_at = now,
            updated_at = now
        });

        // Crossbody
        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0004-000000000001"),
            name = "Piñatex Crossbody Mini",
            slug = "pinatex-crossbody-mini",
            description = "Compact crossbody made from Piñatex — innovative leather alternative made from pineapple leaf fibers. Adjustable strap, magnetic closure, interior pocket.",
            short_description = "Pineapple leather mini crossbody with adjustable strap",
            price = 85.00m,
            compare_at_price = (decimal?)null,
            sku = "CB-PIN-001",
            category_id = crossbodyId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/40916c/ffffff?text=Pinatex+Mini",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0004-000000000002"),
            name = "Mushroom Leather Messenger",
            slug = "mushroom-leather-messenger",
            description = "Revolutionary messenger bag made from Mylo™ mushroom leather. Soft, supple, and completely biodegradable. Features laptop compartment and organizer pockets.",
            short_description = "Mylo™ mushroom leather messenger with laptop compartment",
            price = 195.00m,
            compare_at_price = 240.00m,
            sku = "CB-MSH-002",
            category_id = crossbodyId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/1b4332/ffffff?text=Mushroom+Messenger",
            created_at = now,
            updated_at = now
        });

        // Tote Bags
        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0005-000000000001"),
            name = "Organic Cotton Market Tote",
            slug = "organic-cotton-market-tote",
            description = "Everyday market tote in heavyweight organic cotton canvas. Reinforced handles, interior key pocket, and a flat bottom that stands on its own. Machine washable.",
            short_description = "Heavyweight organic cotton market tote — machine washable",
            price = 35.00m,
            compare_at_price = 45.00m,
            sku = "TT-COT-001",
            category_id = toteId,
            is_active = true,
            is_featured = false,
            main_image_url = "https://placehold.co/600x750/86efac/1a2e1a?text=Cotton+Tote",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0005-000000000002"),
            name = "Jute & Leather Premium Tote",
            slug = "jute-leather-premium-tote",
            description = "Luxurious tote combining natural jute weave with vegetable-tanned leather trim. Handcrafted by artisan cooperatives. Interior suede lining with zipper pocket.",
            short_description = "Handcrafted jute and leather luxury tote",
            price = 145.00m,
            compare_at_price = (decimal?)null,
            sku = "TT-JUT-002",
            category_id = toteId,
            is_active = true,
            is_featured = true,
            main_image_url = "https://placehold.co/600x750/d4a373/ffffff?text=Jute+Premium+Tote",
            created_at = now,
            updated_at = now
        });

        Insert.IntoTable("products").InSchema("catalog").Row(new
        {
            id = Guid.Parse("b1000001-0001-0001-0005-000000000003"),
            name = "Recycled Nylon Shopper",
            slug = "recycled-nylon-shopper",
            description = "Ultra-light shopper bag made from ECONYL® regenerated nylon. Folds into its own pouch for easy carry. Made from rescued ocean waste and fabric scraps.",
            short_description = "ECONYL® recycled nylon foldable shopper bag",
            price = 28.00m,
            compare_at_price = (decimal?)null,
            sku = "TT-NYL-003",
            category_id = toteId,
            is_active = true,
            is_featured = false,
            main_image_url = "https://placehold.co/600x750/52b788/ffffff?text=Nylon+Shopper",
            created_at = now,
            updated_at = now
        });
    }

    public override void Down()
    {
        Delete.FromTable("products").InSchema("catalog").AllRows();
    }
}
