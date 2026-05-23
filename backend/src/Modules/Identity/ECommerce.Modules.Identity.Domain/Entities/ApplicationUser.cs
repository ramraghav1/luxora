using ECommerce.SharedKernel.Domain;

namespace ECommerce.Modules.Identity.Domain.Entities;

public class ApplicationUser : BaseEntity
{
    public string Email { get; private set; } = default!;
    public string PasswordHash { get; private set; } = default!;
    public string FirstName { get; private set; } = default!;
    public string LastName { get; private set; } = default!;
    public string Role { get; private set; } = "User";
    public string? Phone { get; private set; }
    public bool IsActive { get; private set; } = true;
    public DateTime? LastLoginAt { get; private set; }
    public string FullName => $"{FirstName} {LastName}";

    private ApplicationUser() { }

    public static ApplicationUser Create(string email, string passwordHash, string firstName, string lastName, string role = "User", string? phone = null)
    {
        return new ApplicationUser
        {
            Email = email.ToLowerInvariant(),
            PasswordHash = passwordHash,
            FirstName = firstName,
            LastName = lastName,
            Role = role,
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

    public void SetPassword(string passwordHash)
    {
        PasswordHash = passwordHash;
        SetUpdated();
    }

    public void RecordLogin()
    {
        LastLoginAt = DateTime.UtcNow;
        SetUpdated();
    }

    public void Deactivate() { IsActive = false; SetUpdated(); }
    public void Activate() { IsActive = true; SetUpdated(); }
}
