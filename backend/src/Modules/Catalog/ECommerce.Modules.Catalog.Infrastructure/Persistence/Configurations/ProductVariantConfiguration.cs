using ECommerce.Modules.Catalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ECommerce.Modules.Catalog.Infrastructure.Persistence.Configurations;

public class ProductVariantConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.ToTable("product_variants");

        builder.HasKey(v => v.Id);
        builder.Property(v => v.Id).ValueGeneratedNever();

        builder.Property(v => v.ColorName).HasMaxLength(100).IsRequired();
        builder.Property(v => v.ColorHex).HasMaxLength(7).IsRequired();

        builder.HasIndex(v => v.ProductId);
        builder.HasIndex(v => v.VariantGroupId);
        builder.HasIndex(v => new { v.VariantGroupId, v.ProductId }).IsUnique();
    }
}
