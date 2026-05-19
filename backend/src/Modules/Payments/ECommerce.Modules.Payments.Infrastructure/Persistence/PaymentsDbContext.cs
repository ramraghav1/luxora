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
