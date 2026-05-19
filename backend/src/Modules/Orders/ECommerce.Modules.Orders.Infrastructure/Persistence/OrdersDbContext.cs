using ECommerce.Modules.Orders.Domain.Entities;
using ECommerce.SharedKernel.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Modules.Orders.Infrastructure.Persistence;

public class OrdersDbContext : DbContext, IUnitOfWork
{
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    public OrdersDbContext(DbContextOptions<OrdersDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("orders");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(OrdersDbContext).Assembly);
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
