import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ELEMENT_DATA: Product[] = [];

  //Colunas que serão mostradas na tabela
  displayedColumns: string[] = ['idProduct', 'nameProduct', 'priceProduct', 'amountProduct', 'categoriesProduct', 'acoes'];
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Declaração do que será usado
  constructor(
    private toast: ToastrService,
    private service: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(
      {
        next: response => {
          this.ELEMENT_DATA = response['result'];
          this.dataSource = new MatTableDataSource<Product>(response['result']);
          this.dataSource.paginator = this.paginator;
        }, error: () => {
          this.toast.warning('Nenhum resultado encontrado!', 'Aviso');
        }
      }
    )
  }

  //
  deleteProduct(product): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você realmente quer deletar esse produto?',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(product.id).subscribe(() => {
          this.toast.success('O produto ' + product.name + ' foi deletado!', 'Sucesso');
          this.findAll();
        }, ex => {
          if (ex.error.errors) {
            ex.error.errors.forEach(element => {
              this.toast.error(element.message, 'Erro');
            });
          } else {
            this.toast.error(ex.error.message, 'Erro');
          }
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}