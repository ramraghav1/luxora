using ECommerce.Modules.Payments.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerce.Modules.Payments.Infrastructure.Persistence.Configurations;

public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.ToTable("payments");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id).ValueGeneratedNever();

        builder.Property(p => p.Amount).HasPrecision(18, 2).IsRequired();
        builder.Property(p => p.Currency).HasMaxLength(3).IsRequired();
        builder.Property(p => p.TransactionId).HasMaxLength(200);
        builder.Property(p => p.PayPalOrderId).HasMaxLength(200);
        builder.Property(p => p.PayerEmail).HasMaxLength(200);
        builder.Property(p => p.PayerId).HasMaxLength(200);
        builder.Property(p => p.FailureReason).HasMaxLength(1000);
        builder.Property(p => p.RefundId).HasMaxLength(200);
        builder.Property(p => p.RefundedAmount).HasPrecision(18, 2);

        builder.Property(p => p.Method).HasConversion<string>().HasMaxLength(50);
        builder.Property(p => p.Status).HasConversion<string>().HasMaxLength(50);

        builder.HasIndex(p => p.OrderId);
        builder.HasIndex(p => p.PayPalOrderId);
        builder.HasIndex(p => p.TransactionId);
        builder.HasIndex(p => p.Status);

        builder.HasMany(p => p.Transactions)
            .WithOne()
            .HasForeignKey(t => t.PaymentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

public class PaymentTransactionConfiguration : IEntityTypeConfiguration<PaymentTransaction>
{
    public void Configure(EntityTypeBuilder<PaymentTransaction> builder)
    {
        builder.ToTable("payment_transactions");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Id).ValueGeneratedNever();

        builder.Property(t => t.EventType).HasMaxLength(50).IsRequired();
        builder.Property(t => t.Description).HasMaxLength(500).IsRequired();

        builder.HasIndex(t => t.PaymentId);
    }
}

public class VoucherConfiguration : IEntityTypeConfiguration<Voucher>
{
    public void Configure(EntityTypeBuilder<Voucher> builder)
    {
        builder.ToTable("vouchers");
        builder.HasKey(v => v.Id);
        builder.Property(v => v.Id).ValueGeneratedNever();

        builder.Property(v => v.VoucherNumber).HasMaxLength(50).IsRequired();
        builder.Property(v => v.Amount).HasPrecision(18, 2).IsRequired();
        builder.Property(v => v.Currency).HasMaxLength(3).IsRequired();
        builder.Property(v => v.CustomerEmail).HasMaxLength(200).IsRequired();
        builder.Property(v => v.Description).HasMaxLength(500).IsRequired();
        builder.Property(v => v.Type).HasConversion<string>().HasMaxLength(50);

        builder.HasIndex(v => v.VoucherNumber).IsUnique();
        builder.HasIndex(v => v.OrderId);
        builder.HasIndex(v => v.PaymentId);
    }
}
