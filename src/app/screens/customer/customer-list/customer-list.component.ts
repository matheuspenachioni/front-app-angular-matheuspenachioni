import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { provideNgxMask } from 'ngx-mask';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/components/report-dialog/report-dialog.component';

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

  displayedColumns: string[] = ['idCustomer', 'nameCustomer', 'cpfCustomer', 'emailCustomer', 'statusCustomer', 'acoes'];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private toast: ToastrService, 
    private service: CustomerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({next: response => {
      this.ELEMENT_DATA = response['result'];
      this.dataSource = new MatTableDataSource<Customer>(response['result']);
      this.dataSource.paginator = this.paginator;
    }, error: () => {
      this.toast.warning('Nenhum resultado encontrado!', 'Aviso');
    } })
  }

  deleteCustomer(customer): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você realmente quer deletar esse cliente?',
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(customer.id).subscribe(() => {
          this.toast.success('O cliente '+ customer.firstName +' '+ customer.lastName +' foi deletado!', 'Sucesso');
          this.findAll();
        }, ex => {
          if (ex.error.errors) {
            ex.error.errors.forEach(element => {
              this.toast.error(element.message);
            });
          } else {
            this.toast.error(ex.error.message);
          }
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  report() {
    this.service.report().subscribe(response => {
      const result = response.body;
      this.dialog.open(ReportDialogComponent, {
        data: result
      });
    });
  }

}