using ECommerce.Modules.Orders.Domain.Entities;
using ECommerce.SharedKernel.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Modules.Orders.Infrastructure.Persistence;

public class OrdersDbContext : DbContext, IUnitOfWork
{
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    public OrdersDbContext(DbContextOptions<OrdersDbContext> options) : base(options) { }

    // Migrations create Postgres columns as 'timestamp without time zone'; convert so Npgsql doesn't reject Kind=Utc DateTimes on write while keeping Kind=Utc in app code.
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<DateTime>().HaveColumnType("timestamp without time zone").HaveConversion<UtcDateTimeConverter>();
        configurationBuilder.Properties<DateTime?>().HaveColumnType("timestamp without time zone").HaveConversion<NullableUtcDateTimeConverter>();
    }

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
