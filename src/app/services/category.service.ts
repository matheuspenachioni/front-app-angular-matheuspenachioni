import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api_config';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Category> {
    return this.http.get<Category>(`${API_CONFIG.categoryUrl}/${id}`);
  }

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_CONFIG.categoryUrl}`);
  }

  save(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(`${API_CONFIG.categoryUrl}/save`, category);
  }

  delete(id: any): Observable<Category> {
    return this.http.delete<Category>(`${API_CONFIG.categoryUrl}/${id}`);
  }

}
