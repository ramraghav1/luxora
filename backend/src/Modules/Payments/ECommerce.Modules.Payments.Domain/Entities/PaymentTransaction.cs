using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Payments.Domain.Entities;

public class PaymentTransaction : BaseEntity
{
    public Guid PaymentId { get; private set; }
    public string EventType { get; private set; } = default!;
    public string Description { get; private set; } = default!;
    public DateTime OccurredAt { get; private set; }

    private PaymentTransaction() { }

    public static PaymentTransaction Create(Guid paymentId, string eventType, string description)
    {
        return new PaymentTransaction
        {
            PaymentId = paymentId,
            EventType = eventType,
            Description = description,
            OccurredAt = DateTime.UtcNow
        };
    }
}
