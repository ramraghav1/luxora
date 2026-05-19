using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Reviews.Domain.Entities;

public class ProductReview : AggregateRoot
{
    public Guid ProductId { get; private set; }
    public Guid CustomerId { get; private set; }
    public string CustomerName { get; private set; } = default!;
    public int Rating { get; private set; }
    public string Title { get; private set; } = default!;
    public string Body { get; private set; } = default!;
    public bool IsVerifiedPurchase { get; private set; }
    public bool IsApproved { get; private set; }

    private ProductReview() { }

    public static ProductReview Create(Guid productId, Guid customerId, string customerName, int rating, string title, string body, bool isVerifiedPurchase = false)
    {
        if (rating is < 1 or > 5) throw new ArgumentException("Rating must be between 1 and 5.");
        return new ProductReview
        {
            ProductId = productId,
            CustomerId = customerId,
            CustomerName = customerName,
            Rating = rating,
            Title = title,
            Body = body,
            IsVerifiedPurchase = isVerifiedPurchase
        };
    }

    public void Approve() { IsApproved = true; SetUpdated(); }
    public void Reject() { IsApproved = false; SetUpdated(); }
}
