import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiUrl}/categories`;
  private categoriesCache$?: Observable<Category[]>;
  private hierarchyCache$?: Observable<Category[]>;

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.http.get<ApiResponse<Category[]>>(this.apiUrl)
        .pipe(
          map(response => response.data),
          shareReplay({ bufferSize: 1, refCount: true })
        );
    }
    return this.categoriesCache$;
  }

  getCategoryHierarchy(): Observable<Category[]> {
    if (!this.hierarchyCache$) {
      this.hierarchyCache$ = this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/hierarchy`)
        .pipe(
          map(response => response.data),
          shareReplay({ bufferSize: 1, refCount: true })
        );
    }
    return this.hierarchyCache$;
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  getCategoryBySlug(slug: string): Observable<Category> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/slug/${slug}`)
      .pipe(map(response => response.data));
  }
}
