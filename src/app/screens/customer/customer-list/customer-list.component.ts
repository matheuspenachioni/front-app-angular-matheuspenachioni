import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [
    provideNgxMask()
],
})
export class CustomerListComponent implements OnInit {
  ELEMENT_DATA: Customer[] = []

  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'cpfCustomer', 'monthlyIncomeCustomer', 'emailCustomer'];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private toast: ToastrService, 
    private service: CustomerService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({next: resposta => {
      this.ELEMENT_DATA = resposta['result'];
      this.dataSource = new MatTableDataSource<Customer>(resposta['result']);
      this.dataSource.paginator = this.paginator;
    }, error: ex => {
      this.toast.error('Nenhum resultado encontrado!', 'Erro');
    } })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}