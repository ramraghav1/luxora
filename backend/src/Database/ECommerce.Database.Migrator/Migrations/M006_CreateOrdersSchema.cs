using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240201_001)]
public class M006_CreateOrdersSchema : Migration
{
    public override void Up()
    {
        Execute.Sql("CREATE SCHEMA IF NOT EXISTS orders;");

        Create.Table("orders").InSchema("orders")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("order_number").AsString(50).NotNullable().Unique()
            .WithColumn("customer_id").AsGuid().NotNullable()
            .WithColumn("status").AsString(50).NotNullable().WithDefaultValue("Pending")
            .WithColumn("sub_total").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
            .WithColumn("tax_amount").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
            .WithColumn("shipping_amount").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
            .WithColumn("discount_amount").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
            .WithColumn("total_amount").AsDecimal(18, 2).NotNullable().WithDefaultValue(0)
            .WithColumn("coupon_code").AsString(50).Nullable()
            .WithColumn("shipping_first_name").AsString(100).NotNullable()
            .WithColumn("shipping_last_name").AsString(100).NotNullable()
            .WithColumn("shipping_address1").AsString(200).NotNullable()
            .WithColumn("shipping_address2").AsString(200).Nullable()
            .WithColumn("shipping_city").AsString(100).NotNullable()
            .WithColumn("shipping_state").AsString(100).NotNullable()
            .WithColumn("shipping_postal_code").AsString(20).NotNullable()
            .WithColumn("shipping_country").AsString(100).NotNullable()
            .WithColumn("shipping_phone").AsString(30).NotNullable()
            .WithColumn("created_at").AsDateTime().NotNullable()
            .WithColumn("updated_at").AsDateTime().NotNullable();

        Create.Index("ix_orders_customer_id").OnTable("orders").InSchema("orders")
            .OnColumn("customer_id");
        Create.Index("ix_orders_status").OnTable("orders").InSchema("orders")
            .OnColumn("status");
        Create.Index("ix_orders_created_at").OnTable("orders").InSchema("orders")
            .OnColumn("created_at");

        Create.Table("order_items").InSchema("orders")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("order_id").AsGuid().NotNullable().ForeignKey("fk_order_items_order", "orders", "orders", "id")
            .WithColumn("product_id").AsGuid().NotNullable()
            .WithColumn("product_name").AsString(200).NotNullable()
            .WithColumn("image_url").AsString(500).Nullable()
            .WithColumn("unit_price").AsDecimal(18, 2).NotNullable()
            .WithColumn("quantity").AsInt32().NotNullable()
            .WithColumn("created_at").AsDateTime().NotNullable()
            .WithColumn("updated_at").AsDateTime().NotNullable();

        Create.Index("ix_order_items_order_id").OnTable("order_items").InSchema("orders")
            .OnColumn("order_id");
        Create.Index("ix_order_items_product_id").OnTable("order_items").InSchema("orders")
            .OnColumn("product_id");
    }

    public override void Down()
    {
        Delete.Table("order_items").InSchema("orders");
        Delete.Table("orders").InSchema("orders");
        Execute.Sql("DROP SCHEMA IF EXISTS orders;");
    }
}
