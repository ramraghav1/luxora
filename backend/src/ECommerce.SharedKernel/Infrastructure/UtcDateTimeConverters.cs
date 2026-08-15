using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ECommerce.SharedKernel.Infrastructure;

/// <summary>
/// Round-trips DateTime as Kind=Unspecified in the DB (matching 'timestamp without time zone' columns)
/// while always exposing Kind=Utc to application code, avoiding Npgsql's strict Kind checks.
/// </summary>
public sealed class UtcDateTimeConverter : ValueConverter<DateTime, DateTime>
{
    public UtcDateTimeConverter() : base(
        toProvider => DateTime.SpecifyKind(toProvider, DateTimeKind.Unspecified),
        fromProvider => DateTime.SpecifyKind(fromProvider, DateTimeKind.Utc))
    {
    }
}

public sealed class NullableUtcDateTimeConverter : ValueConverter<DateTime?, DateTime?>
{
    public NullableUtcDateTimeConverter() : base(
        toProvider => toProvider.HasValue ? DateTime.SpecifyKind(toProvider.Value, DateTimeKind.Unspecified) : toProvider,
        fromProvider => fromProvider.HasValue ? DateTime.SpecifyKind(fromProvider.Value, DateTimeKind.Utc) : fromProvider)
    {
    }
}
