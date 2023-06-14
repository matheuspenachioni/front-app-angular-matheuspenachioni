import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { provideNgxMask } from 'ngx-mask';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
  providers: [
    provideNgxMask()
  ]
})
export class CustomerCreateComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.customer.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  customer: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    dateCreated: '',
    dateUpdated: '',
    cpf: '',
    email: '',
    password: '',
    status: true
  }

  firstName: FormControl = new FormControl(null, Validators.minLength(3));
  lastName: FormControl = new FormControl(null, Validators.minLength(3));
  monthlyIncome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  validateFields(): boolean {
    return this.firstName.valid &&
      this.lastName.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.password.valid
  }

  hide: boolean = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  save() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdate = datePipe.transform(this.customer.birthdate, 'dd/MM/yyyy');

    this.service.save(this.customer).subscribe({
      next: () => {
        const message = this.customer.id ? 'atualizado' : 'cadastrado';

        this.toast.success('O cliente '+ this.customer.firstName +' '+ this.customer.lastName +' foi '+ message +'!', 'Sucesso');
        this.router.navigate(['customer']);
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
    this.customer.firstName = '';
    this.customer.lastName = '';
    this.customer.birthdate = '';
    this.customer.cpf = '';
    this.customer.email = '';
    this.customer.password = '';
  }

  findById(): void {
    this.service.findById(this.customer.id).subscribe(resposta => {
      this.customer = resposta['result'];

      var date = this.customer.birthdate;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdate = newDate;
    })
  }

}
