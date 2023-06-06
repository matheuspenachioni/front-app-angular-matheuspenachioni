import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  ELEMENT_DATA: Category[] = []

  //Colunas que serão mostradas na tabela
  displayedColumns: string[] = ['idCategory', 'nameCategory', 'descriptionCategory', 'acoes'];
  dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Declaração do que será usado
  constructor(
    private toast: ToastrService,
    private service: CategoryService,
    private dialog: MatDialog
  ) { }

  //Ao abrir o componente será chamada a função que carrega todos os dados
  ngOnInit(): void {
    this.findAll();
  }

  //
  findAll() {
    this.service.findAll().subscribe(
      {
        next: response => {
          this.ELEMENT_DATA = response['result'];
          this.dataSource = new MatTableDataSource<Category>(response['result']);
          this.dataSource.paginator = this.paginator;
        }, error: () => {
          this.toast.warning('Nenhum resultado encontrado!', 'Aviso');
        }
      }
    )
  }

  //
  deleteCategory(category): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Você realmente quer deletar essa categoria?',
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(category.id).subscribe(() => {
          this.toast.success('A categoria ' + category.name + ' foi deletada!', 'Sucesso');
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