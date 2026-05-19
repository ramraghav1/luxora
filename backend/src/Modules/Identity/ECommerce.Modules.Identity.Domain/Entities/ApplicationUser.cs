using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Identity.Domain.Entities;

public class ApplicationUser : BaseEntity
{
    public string Email { get; private set; } = default!;
    public string FirstName { get; private set; } = default!;
    public string LastName { get; private set; } = default!;
    public string? Phone { get; private set; }
    public bool IsActive { get; private set; } = true;
    public string FullName => $"{FirstName} {LastName}";

    private ApplicationUser() { }

    public static ApplicationUser Create(string email, string firstName, string lastName, string? phone = null)
    {
        return new ApplicationUser
        {
            Email = email,
            FirstName = firstName,
            LastName = lastName,
            Phone = phone
        };
    }

    public void UpdateProfile(string firstName, string lastName, string? phone)
    {
        FirstName = firstName;
        LastName = lastName;
        Phone = phone;
        SetUpdated();
    }

    public void Deactivate() { IsActive = false; SetUpdated(); }
    public void Activate() { IsActive = true; SetUpdated(); }
}
