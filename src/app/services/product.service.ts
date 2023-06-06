import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api_config';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Product> {
    return this.http.get<Product>(`${API_CONFIG.productUrl}/${id}`);
  }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_CONFIG.productUrl}`);
  }

  save(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(`${API_CONFIG.productUrl}/save`, product);
  }

  delete(id: any): Observable<Product> {
    return this.http.delete<Product>(`${API_CONFIG.productUrl}/${id}`);
  }

}
