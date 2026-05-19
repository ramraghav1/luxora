using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_100)]
public class M100_SeedCategories : Migration
{
    public override void Up()
    {
        var bagsId = Guid.Parse("a1b2c3d4-0001-0001-0001-000000000001");
        var handbagsId = Guid.Parse("a1b2c3d4-0001-0001-0002-000000000001");
        var backpacksId = Guid.Parse("a1b2c3d4-0001-0001-0003-000000000001");
        var luggageId = Guid.Parse("a1b2c3d4-0001-0001-0004-000000000001");
        var crossbodyId = Guid.Parse("a1b2c3d4-0001-0001-0005-000000000001");
        var toteId = Guid.Parse("a1b2c3d4-0001-0001-0006-000000000001");

        Insert.IntoTable("categories").InSchema("catalog")
            .Row(new { id = bagsId, name = "Bags", slug = "bags", description = "All bags collection", is_active = true, sort_order = 0 });

        Insert.IntoTable("categories").InSchema("catalog")
            .Row(new { id = handbagsId, name = "Handbags", slug = "handbags", description = "Designer and everyday handbags", parent_category_id = bagsId, is_active = true, sort_order = 1 })
            .Row(new { id = backpacksId, name = "Backpacks", slug = "backpacks", description = "Casual and travel backpacks", parent_category_id = bagsId, is_active = true, sort_order = 2 })
            .Row(new { id = luggageId, name = "Luggage", slug = "luggage", description = "Travel luggage and suitcases", parent_category_id = bagsId, is_active = true, sort_order = 3 })
            .Row(new { id = crossbodyId, name = "Crossbody Bags", slug = "crossbody-bags", description = "Crossbody and shoulder bags", parent_category_id = bagsId, is_active = true, sort_order = 4 })
            .Row(new { id = toteId, name = "Tote Bags", slug = "tote-bags", description = "Tote and shopping bags", parent_category_id = bagsId, is_active = true, sort_order = 5 });
    }

    public override void Down()
    {
        Delete.FromTable("categories").InSchema("catalog").AllRows();
    }
}
