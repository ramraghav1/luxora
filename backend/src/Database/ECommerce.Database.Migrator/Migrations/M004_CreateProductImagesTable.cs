using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_004)]
public class M004_CreateProductImagesTable : Migration
{
    public override void Up()
    {
        Create.Table("product_images").InSchema("catalog")
            .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
            .WithColumn("product_id").AsGuid().NotNullable()
            .WithColumn("url").AsString(500).NotNullable()
            .WithColumn("alt_text").AsString(200).Nullable()
            .WithColumn("sort_order").AsInt32().NotNullable().WithDefaultValue(0)
            .WithColumn("created_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("updated_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime);

        Create.ForeignKey("fk_product_images_product")
            .FromTable("product_images").InSchema("catalog").ForeignColumn("product_id")
            .ToTable("products").InSchema("catalog").PrimaryColumn("id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("ix_product_images_product_id")
            .OnTable("product_images").InSchema("catalog")
            .OnColumn("product_id").Ascending();
    }

    public override void Down()
    {
        Delete.Table("product_images").InSchema("catalog");
    }
}
