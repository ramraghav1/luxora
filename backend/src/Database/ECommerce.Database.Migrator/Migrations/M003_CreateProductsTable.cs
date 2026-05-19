using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_003)]
public class M003_CreateProductsTable : Migration
{
    public override void Up()
    {
        Create.Table("products").InSchema("catalog")
            .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
            .WithColumn("name").AsString(200).NotNullable()
            .WithColumn("slug").AsString(250).NotNullable().Unique()
            .WithColumn("description").AsCustom("TEXT").NotNullable()
            .WithColumn("short_description").AsString(500).NotNullable()
            .WithColumn("price").AsDecimal(18, 2).NotNullable()
            .WithColumn("compare_at_price").AsDecimal(18, 2).Nullable()
            .WithColumn("sku").AsString(50).NotNullable().Unique()
            .WithColumn("category_id").AsGuid().NotNullable()
            .WithColumn("is_active").AsBoolean().NotNullable().WithDefaultValue(true)
            .WithColumn("is_featured").AsBoolean().NotNullable().WithDefaultValue(false)
            .WithColumn("main_image_url").AsString(500).Nullable()
            .WithColumn("sort_order").AsInt32().NotNullable().WithDefaultValue(0)
            .WithColumn("meta_title").AsString(200).Nullable()
            .WithColumn("meta_description").AsString(500).Nullable()
            .WithColumn("created_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("updated_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime);

        Create.ForeignKey("fk_products_category")
            .FromTable("products").InSchema("catalog").ForeignColumn("category_id")
            .ToTable("categories").InSchema("catalog").PrimaryColumn("id")
            .OnDelete(System.Data.Rule.None);

        // Performance indexes for ecommerce queries
        Create.Index("ix_products_category_id")
            .OnTable("products").InSchema("catalog")
            .OnColumn("category_id").Ascending();

        Create.Index("ix_products_is_active")
            .OnTable("products").InSchema("catalog")
            .OnColumn("is_active").Ascending();

        Create.Index("ix_products_is_featured")
            .OnTable("products").InSchema("catalog")
            .OnColumn("is_featured").Ascending();

        Create.Index("ix_products_price")
            .OnTable("products").InSchema("catalog")
            .OnColumn("price").Ascending();

        Create.Index("ix_products_created_at")
            .OnTable("products").InSchema("catalog")
            .OnColumn("created_at").Descending();

        // Composite indexes for common query patterns
        Create.Index("ix_products_active_category")
            .OnTable("products").InSchema("catalog")
            .OnColumn("is_active").Ascending()
            .OnColumn("category_id").Ascending();

        Create.Index("ix_products_active_featured")
            .OnTable("products").InSchema("catalog")
            .OnColumn("is_active").Ascending()
            .OnColumn("is_featured").Ascending();
    }

    public override void Down()
    {
        Delete.Table("products").InSchema("catalog");
    }
}
