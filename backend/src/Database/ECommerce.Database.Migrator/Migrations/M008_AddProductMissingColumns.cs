using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_008)]
public class M008_AddProductMissingColumns : Migration
{
    public override void Up()
    {
        Alter.Table("products").InSchema("catalog")
            .AddColumn("sale_price").AsDecimal(18, 2).Nullable()
            .AddColumn("status").AsInt32().NotNullable().WithDefaultValue(0)
            .AddColumn("tags").AsString(1000).Nullable()
            .AddColumn("brand").AsString(200).Nullable();

        Create.Index("ix_products_status")
            .OnTable("products").InSchema("catalog")
            .OnColumn("status").Ascending();
    }

    public override void Down()
    {
        Delete.Index("ix_products_status").OnTable("products").InSchema("catalog");

        Delete.Column("sale_price").FromTable("products").InSchema("catalog");
        Delete.Column("status").FromTable("products").InSchema("catalog");
        Delete.Column("tags").FromTable("products").InSchema("catalog");
        Delete.Column("brand").FromTable("products").InSchema("catalog");
    }
}
