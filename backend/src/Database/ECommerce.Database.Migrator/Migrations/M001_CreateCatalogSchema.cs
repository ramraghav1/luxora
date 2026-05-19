using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240101_001)]
public class M001_CreateCatalogSchema : Migration
{
    public override void Up()
    {
        Execute.Sql("CREATE SCHEMA IF NOT EXISTS catalog;");
    }

    public override void Down()
    {
        Execute.Sql("DROP SCHEMA IF EXISTS catalog CASCADE;");
    }
}
