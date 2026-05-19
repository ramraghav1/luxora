using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_002)]
public class M002_CreateCategoriesTable : Migration
{
    public override void Up()
    {
        Create.Table("categories").InSchema("catalog")
            .WithColumn("id").AsGuid().PrimaryKey().NotNullable()
            .WithColumn("name").AsString(100).NotNullable()
            .WithColumn("slug").AsString(150).NotNullable().Unique()
            .WithColumn("description").AsString(500).Nullable()
            .WithColumn("image_url").AsString(500).Nullable()
            .WithColumn("parent_category_id").AsGuid().Nullable()
            .WithColumn("is_active").AsBoolean().NotNullable().WithDefaultValue(true)
            .WithColumn("sort_order").AsInt32().NotNullable().WithDefaultValue(0)
            .WithColumn("meta_title").AsString(200).Nullable()
            .WithColumn("meta_description").AsString(500).Nullable()
            .WithColumn("created_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime)
            .WithColumn("updated_at").AsDateTime2().NotNullable().WithDefault(SystemMethods.CurrentUTCDateTime);

        Create.ForeignKey("fk_categories_parent")
            .FromTable("categories").InSchema("catalog").ForeignColumn("parent_category_id")
            .ToTable("categories").InSchema("catalog").PrimaryColumn("id");

        Create.Index("ix_categories_parent_category_id")
            .OnTable("categories").InSchema("catalog")
            .OnColumn("parent_category_id").Ascending();

        Create.Index("ix_categories_is_active")
            .OnTable("categories").InSchema("catalog")
            .OnColumn("is_active").Ascending();
    }

    public override void Down()
    {
        Delete.Table("categories").InSchema("catalog");
    }
}
