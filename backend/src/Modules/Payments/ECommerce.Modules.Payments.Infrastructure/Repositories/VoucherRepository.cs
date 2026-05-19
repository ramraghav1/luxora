using ECommerce.Modules.Payments.Application.Interfaces;
using ECommerce.Modules.Payments.Domain.Entities;
using ECommerce.Modules.Payments.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Modules.Payments.Infrastructure.Repositories;

public sealed class VoucherRepository : IVoucherRepository
{
    private readonly PaymentsDbContext _context;

    public VoucherRepository(PaymentsDbContext context)
    {
        _context = context;
    }

    public async Task<Voucher?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers.FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<Voucher>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers.AsNoTracking().OrderByDescending(v => v.IssuedAt).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Voucher>> GetByOrderIdAsync(Guid orderId, CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers
            .Where(v => v.OrderId == orderId)
            .AsNoTracking()
            .OrderByDescending(v => v.IssuedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<Voucher?> GetByVoucherNumberAsync(string voucherNumber, CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers.FirstOrDefaultAsync(v => v.VoucherNumber == voucherNumber, cancellationToken);
    }

    public async Task<IReadOnlyList<Voucher>> GetByPaymentIdAsync(Guid paymentId, CancellationToken cancellationToken = default)
    {
        return await _context.Vouchers
            .Where(v => v.PaymentId == paymentId)
            .AsNoTracking()
            .OrderByDescending(v => v.IssuedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<Voucher> AddAsync(Voucher entity, CancellationToken cancellationToken = default)
    {
        await _context.Vouchers.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task UpdateAsync(Voucher entity, CancellationToken cancellationToken = default)
    {
        _context.Vouchers.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Voucher entity, CancellationToken cancellationToken = default)
    {
        _context.Vouchers.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
