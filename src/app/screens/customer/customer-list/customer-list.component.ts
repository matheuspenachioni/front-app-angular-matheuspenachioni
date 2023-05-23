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
    provideNgxMask() //Mascára de CPF
],
})
export class CustomerListComponent implements OnInit {
  ELEMENT_DATA: Customer[] = []

  //Colunas que serão mostradas na tabela
  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'cpfCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'acoes'];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Declaração do que será usado
  constructor(
    private toast: ToastrService, 
    private service: CustomerService
  ) { }

  //Ao abrir o componente será chamada a função que carrega todos os dados
  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({next: response => {
      this.ELEMENT_DATA = response['result'];
      this.dataSource = new MatTableDataSource<Customer>(response['result']); //Pega o que tem em "result" dentro do "body" da requisição
      this.dataSource.paginator = this.paginator;
    }, error: () => { //Dispara um erro de qualquer tipo, poderia ser usado uma variável no lugar de () para pegar o erro vindo da API
      this.toast.warning('Nenhum resultado encontrado!', 'Aviso');
    } })
  }

  //Filtro de busca que é disparado assim que uma tecla é apertada no input de id "search" e insere os dados achados na tabela
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}