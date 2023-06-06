import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.category.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  category: Category = {
    id: '',
    name: '',
    description: ''
  }

  name: FormControl = new FormControl(null, Validators.minLength(3));
  description: FormControl = new FormControl(null, Validators.minLength(3));

  validateFields(): boolean {
    return this.name.valid &&
      this.description.valid
  }

  hide: boolean = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  saveCategory() {
    console.log(this.category)
    this.service.save(this.category).subscribe({
      next: () => {
        const message = this.category.id ? 'atualizada' : 'cadastrada';

        this.toast.success('A categoria '+ this.category.name +' foi '+ message +'!', 'Sucesso');
        this.router.navigate(['category']);
      }, error: ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message, 'Erro');
          });
        } else {
          this.toast.error(ex.error.message, 'Erro');
        }
      }
    })
  }

  clearFields() {
    this.category.name = '';
    this.category.description = '';
  }

  findById(): void {
    this.service.findById(this.category.id).subscribe(response => {
      this.category = response['result'];
    })
  }

}
