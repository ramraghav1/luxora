using ECommerce.Modules.Payments.Domain.Entities;
using ECommerce.SharedKernel.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Modules.Payments.Infrastructure.Persistence;

public class PaymentsDbContext : DbContext, IUnitOfWork
{
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<PaymentTransaction> PaymentTransactions => Set<PaymentTransaction>();
    public DbSet<Voucher> Vouchers => Set<Voucher>();

    public PaymentsDbContext(DbContextOptions<PaymentsDbContext> options) : base(options) { }

    // Migrations create Postgres columns as 'timestamp without time zone'; convert so Npgsql doesn't reject Kind=Utc DateTimes on write while keeping Kind=Utc in app code.
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<DateTime>().HaveColumnType("timestamp without time zone").HaveConversion<UtcDateTimeConverter>();
        configurationBuilder.Properties<DateTime?>().HaveColumnType("timestamp without time zone").HaveConversion<NullableUtcDateTimeConverter>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("payments");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PaymentsDbContext).Assembly);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<SharedKernel.Domain.BaseEntity>())
        {
            if (entry.State == EntityState.Modified)
                entry.Entity.SetUpdated();
        }
        return await base.SaveChangesAsync(cancellationToken);
    }
}
