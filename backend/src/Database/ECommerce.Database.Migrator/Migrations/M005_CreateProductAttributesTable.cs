using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_005)]
public class M005_CreateProductAttributesTable : Migration
{
    public override void Up()
    {
        Create.Table("product_attributes").InSchema("catalog")
            .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
            .WithColumn("product_id").AsGuid().NotNullable()
            .WithColumn("name").AsString(100).NotNullable()
            .WithColumn("value").AsString(500).NotNullable()
            .WithColumn("created_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("updated_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime);

        Create.ForeignKey("fk_product_attributes_product")
            .FromTable("product_attributes").InSchema("catalog").ForeignColumn("product_id")
            .ToTable("products").InSchema("catalog").PrimaryColumn("id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("ix_product_attributes_product_id")
            .OnTable("product_attributes").InSchema("catalog")
            .OnColumn("product_id").Ascending();

        Create.Index("ix_product_attributes_product_name")
            .OnTable("product_attributes").InSchema("catalog")
            .OnColumn("product_id").Ascending()
            .OnColumn("name").Ascending();
    }

    public override void Down()
    {
        Delete.Table("product_attributes").InSchema("catalog");
    }
}
