using FluentMigrator;

namespace ECommerce.Database.Migrator.Migrations;

[Migration(20240201_002)]
public class M007_CreatePaymentsSchema : Migration
{
    public override void Up()
    {
        Execute.Sql("CREATE SCHEMA IF NOT EXISTS payments;");

        Create.Table("payments").InSchema("payments")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("order_id").AsGuid().NotNullable()
            .WithColumn("amount").AsDecimal(18, 2).NotNullable()
            .WithColumn("currency").AsString(3).NotNullable().WithDefaultValue("USD")
            .WithColumn("method").AsString(50).NotNullable()
            .WithColumn("status").AsString(50).NotNullable().WithDefaultValue("Pending")
            .WithColumn("transaction_id").AsString(200).Nullable()
            .WithColumn("pay_pal_order_id").AsString(200).Nullable()
            .WithColumn("payer_email").AsString(200).Nullable()
            .WithColumn("payer_id").AsString(200).Nullable()
            .WithColumn("failure_reason").AsString(1000).Nullable()
            .WithColumn("paid_at").AsDateTime().Nullable()
            .WithColumn("refund_id").AsString(200).Nullable()
            .WithColumn("refunded_amount").AsDecimal(18, 2).Nullable()
            .WithColumn("refunded_at").AsDateTime().Nullable()
            .WithColumn("created_at").AsDateTime().NotNullable()
            .WithColumn("updated_at").AsDateTime().NotNullable();

        Create.Index("ix_payments_order_id").OnTable("payments").InSchema("payments")
            .OnColumn("order_id");
        Create.Index("ix_payments_paypal_order_id").OnTable("payments").InSchema("payments")
            .OnColumn("pay_pal_order_id");
        Create.Index("ix_payments_transaction_id").OnTable("payments").InSchema("payments")
            .OnColumn("transaction_id");
        Create.Index("ix_payments_status").OnTable("payments").InSchema("payments")
            .OnColumn("status");

        Create.Table("payment_transactions").InSchema("payments")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("payment_id").AsGuid().NotNullable().ForeignKey("fk_payment_transactions_payment", "payments", "payments", "id")
            .WithColumn("event_type").AsString(50).NotNullable()
            .WithColumn("description").AsString(500).NotNullable()
            .WithColumn("occurred_at").AsDateTime().NotNullable()
            .WithColumn("created_at").AsDateTime().NotNullable()
            .WithColumn("updated_at").AsDateTime().NotNullable();

        Create.Index("ix_payment_transactions_payment_id").OnTable("payment_transactions").InSchema("payments")
            .OnColumn("payment_id");

        Create.Table("vouchers").InSchema("payments")
            .WithColumn("id").AsGuid().PrimaryKey()
            .WithColumn("voucher_number").AsString(50).NotNullable().Unique()
            .WithColumn("payment_id").AsGuid().NotNullable()
            .WithColumn("order_id").AsGuid().NotNullable()
            .WithColumn("amount").AsDecimal(18, 2).NotNullable()
            .WithColumn("currency").AsString(3).NotNullable().WithDefaultValue("USD")
            .WithColumn("customer_email").AsString(200).NotNullable()
            .WithColumn("description").AsString(500).NotNullable()
            .WithColumn("type").AsString(50).NotNullable()
            .WithColumn("issued_at").AsDateTime().NotNullable()
            .WithColumn("created_at").AsDateTime().NotNullable()
            .WithColumn("updated_at").AsDateTime().NotNullable();

        Create.Index("ix_vouchers_order_id").OnTable("vouchers").InSchema("payments")
            .OnColumn("order_id");
        Create.Index("ix_vouchers_payment_id").OnTable("vouchers").InSchema("payments")
            .OnColumn("payment_id");
    }

    public override void Down()
    {
        Delete.Table("vouchers").InSchema("payments");
        Delete.Table("payment_transactions").InSchema("payments");
        Delete.Table("payments").InSchema("payments");
        Execute.Sql("DROP SCHEMA IF EXISTS payments;");
    }
}
