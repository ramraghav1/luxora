using ECommerce.Modules.Payments.Application.Interfaces;
using ECommerce.Modules.Payments.Application.Services;
using ECommerce.Modules.Payments.Infrastructure.PayPal;
using ECommerce.Modules.Payments.Infrastructure.Persistence;
using ECommerce.Modules.Payments.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Modules.Payments.Infrastructure;

public static class PaymentsModule
{
    public static IServiceCollection AddPaymentsModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<PaymentsDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection"),
                npgsql =>
                {
                    npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "payments");
                    npgsql.EnableRetryOnFailure(3);
                })
            .UseSnakeCaseNamingConvention());

        // Repositories
        services.AddScoped<IPaymentRepository, PaymentRepository>();
        services.AddScoped<IVoucherRepository, VoucherRepository>();

        // Services
        services.AddScoped<IPaymentService, PaymentService>();

        // PayPal HTTP client
        var baseUrl = configuration["PayPal:BaseUrl"] ?? "https://api-m.sandbox.paypal.com/";
        services.AddHttpClient<IPayPalClient, PayPalClient>(client =>
        {
            client.BaseAddress = new Uri(baseUrl);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

        return services;
    }
}
