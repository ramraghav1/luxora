import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  salePrice?: number;
  sku: string;
  categoryId: string;
  categoryName: string;
  status: ProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  mainImageUrl?: string;
  tags?: string;
  brand?: string;
  images: ProductImageDto[];
  attributes: ProductAttributeDto[];
  media: ProductMediaDto[];
  variants: ProductVariantDto[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImageDto {
  id: string;
  url: string;
  altText?: string;
  sortOrder: number;
}

export interface ProductAttributeDto {
  id: string;
  name: string;
  value: string;
}

export interface ProductMediaDto {
  id: string;
  url: string;
  type: MediaType;
  altText?: string;
  thumbnailUrl?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductVariantDto {
  id: string;
  productId: string;
  productName: string;
  productImageUrl?: string;
  variantGroupId: string;
  colorName: string;
  colorHex: string;
  sortOrder: number;
}

export enum ProductStatus {
  Draft = 0,
  Active = 1,
  OnSale = 2,
  OutOfStock = 3,
  Discontinued = 4
}

export enum MediaType {
  Image = 0,
  Video = 1
}

export interface CreateProductRequest {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  salePrice?: number;
  sku: string;
  categoryId: string;
  mainImageUrl?: string;
  isFeatured: boolean;
  tags?: string;
  brand?: string;
  status: ProductStatus;
  media: MediaRequest[];
  attributes: AttributeRequest[];
  variants: VariantRequest[];
}

export interface UpdateProductRequest extends CreateProductRequest {}

export interface MediaRequest {
  url: string;
  type: MediaType;
  altText?: string;
  thumbnailUrl?: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface AttributeRequest {
  name: string;
  value: string;
}

export interface VariantRequest {
  productId: string;
  colorName: string;
  colorHex: string;
  sortOrder: number;
}

export interface UpdateProductStatusRequest {
  status: ProductStatus;
  salePrice?: number;
}

export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategoryId?: string;
  isActive: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  status?: ProductStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: string;
  sortDirection?: string;
}

export interface UploadImageResponse {
  url: string;
  fileName: string;
  sizeInBytes: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/products`;

  getProducts(params: ProductQueryParams = {}): Observable<ApiResponse<PagedResult<ProductDto>>> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page);
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params.status !== undefined) httpParams = httpParams.set('status', params.status);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDirection) httpParams = httpParams.set('sortDirection', params.sortDirection);
    return this.http.get<ApiResponse<PagedResult<ProductDto>>>(this.baseUrl, { params: httpParams });
  }

  getProduct(id: string): Observable<ApiResponse<ProductDto>> {
    return this.http.get<ApiResponse<ProductDto>>(`${this.baseUrl}/${id}`);
  }

  createProduct(request: CreateProductRequest): Observable<ApiResponse<ProductDto>> {
    return this.http.post<ApiResponse<ProductDto>>(this.baseUrl, request);
  }

  updateProduct(id: string, request: UpdateProductRequest): Observable<ApiResponse<ProductDto>> {
    return this.http.put<ApiResponse<ProductDto>>(`${this.baseUrl}/${id}`, request);
  }

  deleteProduct(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: string, request: UpdateProductStatusRequest): Observable<ApiResponse<ProductDto>> {
    return this.http.patch<ApiResponse<ProductDto>>(`${this.baseUrl}/${id}/status`, request);
  }

  getCategories(): Observable<ApiResponse<CategoryDto[]>> {
    return this.http.get<ApiResponse<CategoryDto[]>>(`${environment.apiUrl}/categories`);
  }

  uploadImage(file: File): Observable<ApiResponse<UploadImageResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadImageResponse>>(`${this.baseUrl}/images`, formData);
  }
}
