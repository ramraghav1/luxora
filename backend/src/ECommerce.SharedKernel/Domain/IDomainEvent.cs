namespace ECommerce.SharedKernel.Domain;

public interface IDomainEvent
{
    DateTime OccurredOn { get; }
}
