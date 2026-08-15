using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_009)]
public class M009_CreateProductMediaTable : Migration
{
    public override void Up()
    {
        Create.Table("product_media").InSchema("catalog")
            .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
            .WithColumn("product_id").AsGuid().NotNullable()
            .WithColumn("url").AsString(500).NotNullable()
            .WithColumn("type").AsInt32().NotNullable()
            .WithColumn("alt_text").AsString(200).Nullable()
            .WithColumn("thumbnail_url").AsString(500).Nullable()
            .WithColumn("sort_order").AsInt32().NotNullable().WithDefaultValue(0)
            .WithColumn("is_primary").AsBoolean().NotNullable().WithDefaultValue(false)
            .WithColumn("created_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("updated_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime);

        Create.ForeignKey("fk_product_media_product")
            .FromTable("product_media").InSchema("catalog").ForeignColumn("product_id")
            .ToTable("products").InSchema("catalog").PrimaryColumn("id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("ix_product_media_product_id")
            .OnTable("product_media").InSchema("catalog")
            .OnColumn("product_id").Ascending();

        Create.Index("ix_product_media_product_sort")
            .OnTable("product_media").InSchema("catalog")
            .OnColumn("product_id").Ascending()
            .OnColumn("sort_order").Ascending();
    }

    public override void Down()
    {
        Delete.Table("product_media").InSchema("catalog");
    }
}
