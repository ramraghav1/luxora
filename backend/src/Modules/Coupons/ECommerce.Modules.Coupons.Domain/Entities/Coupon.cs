using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Coupons.Domain.Entities;

public class Coupon : AggregateRoot
{
    public string Code { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DiscountType Type { get; private set; }
    public decimal Value { get; private set; }
    public decimal? MinimumOrderAmount { get; private set; }
    public decimal? MaximumDiscountAmount { get; private set; }
    public int? UsageLimit { get; private set; }
    public int UsageCount { get; private set; }
    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public bool IsActive { get; private set; } = true;

    public bool IsValid => IsActive && DateTime.UtcNow >= StartDate && DateTime.UtcNow <= EndDate
                           && (!UsageLimit.HasValue || UsageCount < UsageLimit.Value);

    private Coupon() { }

    public static Coupon Create(string code, string description, DiscountType type, decimal value,
        DateTime startDate, DateTime endDate, decimal? minimumOrderAmount = null,
        decimal? maximumDiscountAmount = null, int? usageLimit = null)
    {
        return new Coupon
        {
            Code = code.ToUpperInvariant(),
            Description = description,
            Type = type,
            Value = value,
            MinimumOrderAmount = minimumOrderAmount,
            MaximumDiscountAmount = maximumDiscountAmount,
            UsageLimit = usageLimit,
            StartDate = startDate,
            EndDate = endDate
        };
    }

    public decimal CalculateDiscount(decimal orderTotal)
    {
        if (!IsValid) return 0;
        if (MinimumOrderAmount.HasValue && orderTotal < MinimumOrderAmount.Value) return 0;

        var discount = Type == DiscountType.Percentage ? orderTotal * (Value / 100m) : Value;
        if (MaximumDiscountAmount.HasValue) discount = Math.Min(discount, MaximumDiscountAmount.Value);
        return Math.Min(discount, orderTotal);
    }

    public void IncrementUsage() { UsageCount++; SetUpdated(); }
    public void Deactivate() { IsActive = false; SetUpdated(); }
}

public enum DiscountType { Percentage, FixedAmount }
