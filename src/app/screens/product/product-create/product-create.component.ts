import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent  implements OnInit {
  constructor(
    private toast: ToastrService,
    private service: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.loadAllCategories(); 
  }

  allCategories: Category[] = [];
  selectedCategories: Category[] = [];

  product: Product = {
    id: '',
    name: '',
    price: '',
    amount: '',
    categories: []
  }

  name: FormControl = new FormControl(null, Validators.minLength(3));
  price: FormControl = new FormControl(null, Validators.required);
  amount: FormControl = new FormControl(null, Validators.required);
  categories: FormControl = new FormControl(null, Validators.required);

  validateFields(): boolean {
    return this.name.valid &&
      this.price.valid &&
      this.amount.valid
  }

  hide: boolean = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  loadAllCategories(): void {
    this.categoryService.findAll().subscribe(response => {
      this.allCategories = response['result'];
    });
  }

  saveProduct() {
    this.product.categories = this.selectedCategories;

    console.log(this.selectedCategories)

    this.service.save(this.product).subscribe({
      next: () => {
        const message = this.product.id ? 'atualizado' : 'cadastrado';

        this.toast.success('O produto '+ this.product.name +' foi '+ message +'!', 'Sucesso');
        this.router.navigate(['product']);
      }, error: ex => {
        if (ex.error && ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message, 'Erro');
          });
        } else if (ex.error && ex.error.message) {
          this.toast.error(ex.error.message, 'Erro');
        } else {
          this.toast.error('Ocorreu um erro ao salvar o produto.', 'Erro');
        }
      }
    });
  }

  clearFields() {
    this.product.name = '';
    this.product.price = '';
    this.product.amount = '';
  }

  findById(): void {
    this.service.findById(this.product.id).subscribe(response => {
      this.product = response['result'];
      this.selectedCategories = this.product.categories;
    })
  }

  compareCategories(category1: Category, category2: Category): boolean {
    return category1 && category2 ? category1.id === category2.id : category1 === category2;
  }
}