using ECommerce.Modules.Identity.Domain.Entities;

namespace ECommerce.Modules.Identity.Application.Interfaces;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) GenerateToken(ApplicationUser user);
}
