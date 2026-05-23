using ECommerce.Modules.Identity.Application.DTOs;
using ECommerce.Modules.Identity.Application.Interfaces;
using ECommerce.Modules.Identity.Domain.Entities;
using ECommerce.SharedKernel.Application;

namespace ECommerce.Modules.Identity.Application.Services;

public sealed class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IPasswordHasher _passwordHasher;

    public AuthService(IUserRepository userRepository, ITokenService tokenService, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    public async Task<Result<AuthResponse>> LoginAsync(LoginRequest request, CancellationToken ct = default)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email.ToLowerInvariant(), ct);
        if (user is null || !user.IsActive)
            return Result<AuthResponse>.Failure("Invalid email or password.");

        if (!_passwordHasher.Verify(request.Password, user.PasswordHash))
            return Result<AuthResponse>.Failure("Invalid email or password.");

        user.RecordLogin();
        await _userRepository.SaveChangesAsync(ct);

        var (token, expiresAt) = _tokenService.GenerateToken(user);

        return Result<AuthResponse>.Success(new AuthResponse(
            token,
            expiresAt,
            new UserDto(user.Id, user.Email, user.FirstName, user.LastName, user.Role)
        ));
    }

    public async Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        if (await _userRepository.ExistsAsync(request.Email.ToLowerInvariant(), ct))
            return Result<AuthResponse>.Failure("An account with this email already exists.");

        var passwordHash = _passwordHasher.Hash(request.Password);
        var user = ApplicationUser.Create(
            request.Email,
            passwordHash,
            request.FirstName,
            request.LastName,
            role: "User",
            phone: request.Phone
        );

        await _userRepository.AddAsync(user, ct);
        await _userRepository.SaveChangesAsync(ct);

        var (token, expiresAt) = _tokenService.GenerateToken(user);

        return Result<AuthResponse>.Success(new AuthResponse(
            token,
            expiresAt,
            new UserDto(user.Id, user.Email, user.FirstName, user.LastName, user.Role)
        ));
    }

    public async Task<Result<ForgotPasswordResponse>> ForgotPasswordAsync(ForgotPasswordRequest request, CancellationToken ct = default)
    {
        // In production, send a reset email. For now, just acknowledge.
        var user = await _userRepository.GetByEmailAsync(request.Email.ToLowerInvariant(), ct);
        if (user is null)
        {
            // Don't reveal whether the email exists
            return Result<ForgotPasswordResponse>.Success(
                new ForgotPasswordResponse("If an account with that email exists, a password reset link has been sent."));
        }

        return Result<ForgotPasswordResponse>.Success(
            new ForgotPasswordResponse("If an account with that email exists, a password reset link has been sent."));
    }
}
