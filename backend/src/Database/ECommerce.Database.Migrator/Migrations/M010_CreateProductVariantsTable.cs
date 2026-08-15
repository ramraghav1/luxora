using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_010)]
public class M010_CreateProductVariantsTable : Migration
{
    public override void Up()
    {
        Create.Table("product_variants").InSchema("catalog")
            .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
            .WithColumn("product_id").AsGuid().NotNullable()
            .WithColumn("variant_group_id").AsGuid().NotNullable()
            .WithColumn("color_name").AsString(100).NotNullable()
            .WithColumn("color_hex").AsString(7).NotNullable()
            .WithColumn("sort_order").AsInt32().NotNullable().WithDefaultValue(0)
            .WithColumn("created_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("updated_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime);

        Create.ForeignKey("fk_product_variants_product")
            .FromTable("product_variants").InSchema("catalog").ForeignColumn("product_id")
            .ToTable("products").InSchema("catalog").PrimaryColumn("id")
            .OnDelete(System.Data.Rule.Cascade);

        Create.Index("ix_product_variants_product_id")
            .OnTable("product_variants").InSchema("catalog")
            .OnColumn("product_id").Ascending();

        Create.Index("ix_product_variants_variant_group_id")
            .OnTable("product_variants").InSchema("catalog")
            .OnColumn("variant_group_id").Ascending();

        Create.Index("ix_product_variants_group_product_unique")
            .OnTable("product_variants").InSchema("catalog")
            .OnColumn("variant_group_id").Ascending()
            .OnColumn("product_id").Ascending()
            .WithOptions().Unique();
    }

    public override void Down()
    {
        Delete.Table("product_variants").InSchema("catalog");
    }
}
