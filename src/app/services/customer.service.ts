import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../config/api_config';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${API_CONFIG.customerUrl}/${id}`);
  }

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_CONFIG.customerUrl}`);
  }

  save(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(`${API_CONFIG.customerUrl}/save`, customer);
  }

  delete(id: any): Observable<Customer> {
    return this.http.delete<Customer>(`${API_CONFIG.customerUrl}/${id}`);
  }

  report(): Observable<any> {
    return this.http.get(`${API_CONFIG.customerUrl}/report`, {  observe: 'response', responseType: 'text'});
  }

}
