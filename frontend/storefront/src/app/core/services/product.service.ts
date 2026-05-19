import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponse, PagedResult } from '../models/api-response.model';
import { Product, ProductQueryParams, Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;
  private featuredCache$?: Observable<Product[]>;
  private slugCache = new Map<string, Observable<Product>>();

  constructor(private readonly http: HttpClient) {}

  getProducts(params: ProductQueryParams = {}): Observable<PagedResult<Product>> {
    let httpParams = new HttpParams();

    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);
    if (params.minPrice !== undefined) httpParams = httpParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
    if (params.isActive !== undefined) httpParams = httpParams.set('isActive', params.isActive.toString());
    if (params.isFeatured !== undefined) httpParams = httpParams.set('isFeatured', params.isFeatured.toString());
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDirection) httpParams = httpParams.set('sortDirection', params.sortDirection);

    return this.http.get<ApiResponse<PagedResult<Product>>>(this.apiUrl, { params: httpParams })
      .pipe(map(response => response.data));
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  getProductBySlug(slug: string): Observable<Product> {
    if (!this.slugCache.has(slug)) {
      const product$ = this.http.get<ApiResponse<Product>>(`${this.apiUrl}/slug/${slug}`)
        .pipe(
          map(response => response.data),
          shareReplay({ bufferSize: 1, refCount: true })
        );
      this.slugCache.set(slug, product$);
    }
    return this.slugCache.get(slug)!;
  }

  getFeaturedProducts(count: number = 8): Observable<Product[]> {
    if (!this.featuredCache$) {
      this.featuredCache$ = this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/featured`, {
        params: new HttpParams().set('count', count.toString())
      }).pipe(
        map(response => response.data),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.featuredCache$;
  }
}
