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

  findById(idCustomer: any): Observable<Customer> {
    return this.http.get<Customer>(`${API_CONFIG.customerUrl}/findCustomer/${idCustomer}`);
  }

  findAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_CONFIG.customerUrl}/list`);
  }

  create(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(`${API_CONFIG.customerUrl}/create`, customer);
  }

  update(customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(`${API_CONFIG.customerUrl}/update`, customer);
  }

  delete(idCustomer: any): Observable<Customer> {
    return this.http.delete<Customer>(`${API_CONFIG.customerUrl}/delete/${idCustomer}`);
  }

}
