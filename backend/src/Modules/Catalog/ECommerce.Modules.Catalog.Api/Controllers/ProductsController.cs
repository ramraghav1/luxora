using ECommerce.Modules.Catalog.Application.DTOs;
using ECommerce.Modules.Catalog.Application.Interfaces;
using ECommerce.SharedKernel.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Modules.Catalog.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts(
        [FromQuery] ProductQueryParameters parameters,
        CancellationToken cancellationToken)
    {
        var result = await _productService.GetPagedAsync(parameters, cancellationToken);
        return Ok(ApiResponse<object>.Ok(result.Value!));
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProduct(Guid id, CancellationToken cancellationToken)
    {
        var result = await _productService.GetByIdAsync(id, cancellationToken);
        if (!result.IsSuccess)
            return NotFound(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<ProductDto>.Ok(result.Value!));
    }

    [HttpGet("slug/{slug}")]
    public async Task<IActionResult> GetProductBySlug(string slug, CancellationToken cancellationToken)
    {
        var result = await _productService.GetBySlugAsync(slug, cancellationToken);
        if (!result.IsSuccess)
            return NotFound(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<ProductDto>.Ok(result.Value!));
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProducts(
        [FromQuery] int count = 8,
        CancellationToken cancellationToken = default)
    {
        var result = await _productService.GetFeaturedAsync(count, cancellationToken);
        return Ok(ApiResponse<object>.Ok(result.Value!));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateProduct(
        [FromBody] CreateProductRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _productService.CreateAsync(request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return CreatedAtAction(
            nameof(GetProduct),
            new { id = result.Value!.Id },
            ApiResponse<ProductDto>.Ok(result.Value));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProduct(
        Guid id,
        [FromBody] UpdateProductRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _productService.UpdateAsync(id, request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<ProductDto>.Ok(result.Value!));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(Guid id, CancellationToken cancellationToken)
    {
        var result = await _productService.DeleteAsync(id, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse.Ok("Product deleted successfully."));
    }

    [HttpPatch("{id:guid}/activate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ActivateProduct(Guid id, CancellationToken cancellationToken)
    {
        var result = await _productService.ActivateAsync(id, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse.Ok("Product activated."));
    }

    [HttpPatch("{id:guid}/deactivate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeactivateProduct(Guid id, CancellationToken cancellationToken)
    {
        var result = await _productService.DeactivateAsync(id, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse.Ok("Product deactivated."));
    }

    [HttpPatch("{id:guid}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProductStatus(
        Guid id,
        [FromBody] UpdateProductStatusRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _productService.UpdateStatusAsync(id, request, cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse.Fail(result.Error!));

        return Ok(ApiResponse<ProductDto>.Ok(result.Value!));
    }
}
