FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files for restore
COPY ECommerce.sln .
COPY src/ECommerce.Api/ECommerce.Api.csproj src/ECommerce.Api/
COPY src/ECommerce.SharedKernel/ECommerce.SharedKernel.csproj src/ECommerce.SharedKernel/
COPY src/Modules/Catalog/ECommerce.Modules.Catalog.Api/ECommerce.Modules.Catalog.Api.csproj src/Modules/Catalog/ECommerce.Modules.Catalog.Api/
COPY src/Modules/Catalog/ECommerce.Modules.Catalog.Application/ECommerce.Modules.Catalog.Application.csproj src/Modules/Catalog/ECommerce.Modules.Catalog.Application/
COPY src/Modules/Catalog/ECommerce.Modules.Catalog.Domain/ECommerce.Modules.Catalog.Domain.csproj src/Modules/Catalog/ECommerce.Modules.Catalog.Domain/
COPY src/Modules/Catalog/ECommerce.Modules.Catalog.Infrastructure/ECommerce.Modules.Catalog.Infrastructure.csproj src/Modules/Catalog/ECommerce.Modules.Catalog.Infrastructure/
COPY src/Modules/Orders/ECommerce.Modules.Orders.Api/ECommerce.Modules.Orders.Api.csproj src/Modules/Orders/ECommerce.Modules.Orders.Api/
COPY src/Modules/Orders/ECommerce.Modules.Orders.Application/ECommerce.Modules.Orders.Application.csproj src/Modules/Orders/ECommerce.Modules.Orders.Application/
COPY src/Modules/Orders/ECommerce.Modules.Orders.Domain/ECommerce.Modules.Orders.Domain.csproj src/Modules/Orders/ECommerce.Modules.Orders.Domain/
COPY src/Modules/Orders/ECommerce.Modules.Orders.Infrastructure/ECommerce.Modules.Orders.Infrastructure.csproj src/Modules/Orders/ECommerce.Modules.Orders.Infrastructure/
COPY src/Modules/Payments/ECommerce.Modules.Payments.Api/ECommerce.Modules.Payments.Api.csproj src/Modules/Payments/ECommerce.Modules.Payments.Api/
COPY src/Modules/Payments/ECommerce.Modules.Payments.Application/ECommerce.Modules.Payments.Application.csproj src/Modules/Payments/ECommerce.Modules.Payments.Application/
COPY src/Modules/Payments/ECommerce.Modules.Payments.Domain/ECommerce.Modules.Payments.Domain.csproj src/Modules/Payments/ECommerce.Modules.Payments.Domain/
COPY src/Modules/Payments/ECommerce.Modules.Payments.Infrastructure/ECommerce.Modules.Payments.Infrastructure.csproj src/Modules/Payments/ECommerce.Modules.Payments.Infrastructure/
COPY src/Modules/Cart/ECommerce.Modules.Cart.Api/ECommerce.Modules.Cart.Api.csproj src/Modules/Cart/ECommerce.Modules.Cart.Api/
COPY src/Modules/Cart/ECommerce.Modules.Cart.Application/ECommerce.Modules.Cart.Application.csproj src/Modules/Cart/ECommerce.Modules.Cart.Application/
COPY src/Modules/Cart/ECommerce.Modules.Cart.Domain/ECommerce.Modules.Cart.Domain.csproj src/Modules/Cart/ECommerce.Modules.Cart.Domain/
COPY src/Modules/Cart/ECommerce.Modules.Cart.Infrastructure/ECommerce.Modules.Cart.Infrastructure.csproj src/Modules/Cart/ECommerce.Modules.Cart.Infrastructure/
COPY src/Modules/Identity/ECommerce.Modules.Identity.Api/ECommerce.Modules.Identity.Api.csproj src/Modules/Identity/ECommerce.Modules.Identity.Api/
COPY src/Modules/Identity/ECommerce.Modules.Identity.Application/ECommerce.Modules.Identity.Application.csproj src/Modules/Identity/ECommerce.Modules.Identity.Application/
COPY src/Modules/Identity/ECommerce.Modules.Identity.Domain/ECommerce.Modules.Identity.Domain.csproj src/Modules/Identity/ECommerce.Modules.Identity.Domain/
COPY src/Modules/Identity/ECommerce.Modules.Identity.Infrastructure/ECommerce.Modules.Identity.Infrastructure.csproj src/Modules/Identity/ECommerce.Modules.Identity.Infrastructure/
COPY src/Modules/Inventory/ECommerce.Modules.Inventory.Api/ECommerce.Modules.Inventory.Api.csproj src/Modules/Inventory/ECommerce.Modules.Inventory.Api/
COPY src/Modules/Inventory/ECommerce.Modules.Inventory.Application/ECommerce.Modules.Inventory.Application.csproj src/Modules/Inventory/ECommerce.Modules.Inventory.Application/
COPY src/Modules/Inventory/ECommerce.Modules.Inventory.Domain/ECommerce.Modules.Inventory.Domain.csproj src/Modules/Inventory/ECommerce.Modules.Inventory.Domain/
COPY src/Modules/Inventory/ECommerce.Modules.Inventory.Infrastructure/ECommerce.Modules.Inventory.Infrastructure.csproj src/Modules/Inventory/ECommerce.Modules.Inventory.Infrastructure/
COPY src/Modules/Reviews/ECommerce.Modules.Reviews.Api/ECommerce.Modules.Reviews.Api.csproj src/Modules/Reviews/ECommerce.Modules.Reviews.Api/
COPY src/Modules/Reviews/ECommerce.Modules.Reviews.Application/ECommerce.Modules.Reviews.Application.csproj src/Modules/Reviews/ECommerce.Modules.Reviews.Application/
COPY src/Modules/Reviews/ECommerce.Modules.Reviews.Domain/ECommerce.Modules.Reviews.Domain.csproj src/Modules/Reviews/ECommerce.Modules.Reviews.Domain/
COPY src/Modules/Reviews/ECommerce.Modules.Reviews.Infrastructure/ECommerce.Modules.Reviews.Infrastructure.csproj src/Modules/Reviews/ECommerce.Modules.Reviews.Infrastructure/
COPY src/Modules/Coupons/ECommerce.Modules.Coupons.Api/ECommerce.Modules.Coupons.Api.csproj src/Modules/Coupons/ECommerce.Modules.Coupons.Api/
COPY src/Modules/Coupons/ECommerce.Modules.Coupons.Application/ECommerce.Modules.Coupons.Application.csproj src/Modules/Coupons/ECommerce.Modules.Coupons.Application/
COPY src/Modules/Coupons/ECommerce.Modules.Coupons.Domain/ECommerce.Modules.Coupons.Domain.csproj src/Modules/Coupons/ECommerce.Modules.Coupons.Domain/
COPY src/Modules/Coupons/ECommerce.Modules.Coupons.Infrastructure/ECommerce.Modules.Coupons.Infrastructure.csproj src/Modules/Coupons/ECommerce.Modules.Coupons.Infrastructure/
COPY src/Database/ECommerce.Database.Migrator/ECommerce.Database.Migrator.csproj src/Database/ECommerce.Database.Migrator/

RUN dotnet restore

# Copy everything and publish
COPY . .
RUN dotnet publish src/ECommerce.Api/ECommerce.Api.csproj -c Release -o /app/publish --no-restore

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "ECommerce.Api.dll"]
