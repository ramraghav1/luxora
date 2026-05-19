# ECommerce Platform

Production-grade ecommerce system built with a modular monolith architecture.

## Tech Stack

- **Frontend**: Angular (Storefront + Admin with Sakai template)
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core
- **Migrations**: FluentMigrator
- **Architecture**: Modular Monolith + Clean Architecture

## Project Structure

```
ecommerce-platform/
├── backend/
│   └── src/
│       ├── ECommerce.Api/                          # API Host
│       ├── ECommerce.SharedKernel/                 # Shared primitives
│       ├── Modules/
│       │   ├── Catalog/                            # Products & Categories
│       │   ├── Orders/                             # Checkout & Order management
│       │   ├── Cart/                               # Shopping cart
│       │   ├── Identity/                           # Users, Auth, JWT
│       │   ├── Payments/                           # Payment processing
│       │   ├── Inventory/                          # Stock management
│       │   ├── Reviews/                            # Product reviews
│       │   └── Coupons/                            # Discount system
│       └── Database/
│           └── ECommerce.Database.Migrator/        # FluentMigrator
├── frontend/
│   ├── storefront/                                 # Customer-facing Angular app
│   └── admin/                                      # Sakai-based admin dashboard
└── nx.json
```

## Getting Started

### Backend
```bash
cd backend
dotnet restore
dotnet run --project src/ECommerce.Api
```

### Database Migrations
```bash
cd backend
dotnet run --project src/Database/ECommerce.Database.Migrator
```

### Frontend Storefront
```bash
cd frontend/storefront
npm install
ng serve
```

### Frontend Admin
```bash
cd frontend/admin
npm install
ng serve --port 4201
```
