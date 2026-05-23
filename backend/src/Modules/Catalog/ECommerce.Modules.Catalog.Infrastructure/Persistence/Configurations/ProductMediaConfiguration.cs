using ECommerce.Modules.Catalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerce.Modules.Catalog.Infrastructure.Persistence.Configurations;

public class ProductMediaConfiguration : IEntityTypeConfiguration<ProductMedia>
{
    public void Configure(EntityTypeBuilder<ProductMedia> builder)
    {
        builder.ToTable("product_media");

        builder.HasKey(m => m.Id);
        builder.Property(m => m.Id).ValueGeneratedNever();

        builder.Property(m => m.Url).HasMaxLength(500).IsRequired();
        builder.Property(m => m.Type).HasConversion<int>().IsRequired();
        builder.Property(m => m.AltText).HasMaxLength(200);
        builder.Property(m => m.ThumbnailUrl).HasMaxLength(500);

        builder.HasIndex(m => m.ProductId);
        builder.HasIndex(m => new { m.ProductId, m.SortOrder });
    }
}
