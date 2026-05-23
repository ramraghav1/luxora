namespace ECommerce.Modules.Identity.Application.DTOs;

public record LoginRequest(string Email, string Password);

public record RegisterRequest(string Email, string Password, string FirstName, string LastName, string? Phone = null);

public record AuthResponse(string Token, DateTime ExpiresAt, UserDto User);

public record UserDto(Guid Id, string Email, string FirstName, string LastName, string Role);

public record ForgotPasswordRequest(string Email);

public record ForgotPasswordResponse(string Message);
