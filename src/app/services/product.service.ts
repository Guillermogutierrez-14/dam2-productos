import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  getProducts(limit = 10, skip = 0): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip);

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }
}