import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
],
})
export class CustomerCreateComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private service: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }

  // Instrução de como deve ser a validação de cada campo
  firstNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  lastNameCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  //birthdateCustomer: FormControl = new FormControl(null, Validators.required);
  monthlyIncomeCustomer: FormControl = new FormControl(null, Validators.minLength(3));
  cpfCustomer: FormControl = new FormControl(null, Validators.required);
  emailCustomer: FormControl = new FormControl(null, Validators.email);
  passwordCustomer: FormControl = new FormControl(null, Validators.minLength(3));

  // Função que verifica se os campos estão validados
  validateFields(): boolean {
    return this.firstNameCustomer.valid &&
      this.lastNameCustomer.valid &&
      //O botão não desbloqueia com a validação de data kkk
      //this.customer.birthdateCustomer.valid &&
      //E aqui não é aceito o .valid, ainda pensarei em como arrumar ambos
      //this.customer.monthlyIncomeCustomer.valid &&
      this.cpfCustomer.valid &&
      this.emailCustomer.valid &&
      this.passwordCustomer.valid
  }

  // Mostrar/Ocultar senha
  hide: boolean = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  // Função que chama o endpoint create passando os dados dos campos
  createCustomer() {

    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/yyyy');

    /*
      Houve uma mudança no subscribe() para as versões mais recentes do Angular,
      onde antes não era necessário o {next: , error:}, ou seja, poderia ser 
      feito diretamente
    */
    this.service.create(this.customer).subscribe({
      next: () => {
        this.toast.success('O cliente ' + this.customer.firstNameCustomer + ' ' + this.customer.lastNameCustomer + ' foi cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['customer'])
      }, error: ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message, 'Erro'); //Aparece o erro feião...
          });
        } else {
          this.toast.error(ex.error.message, 'Erro'); //Aparece o erro feião...
        }
      }
    })
  }

  // Função para limpar todos os campos
  clearFields() {
    this.customer.firstNameCustomer = '';
    this.customer.lastNameCustomer = '';
    this.customer.birthdateCustomer = '';
    this.customer.monthlyIncomeCustomer = '';
    this.customer.cpfCustomer = '';
    this.customer.emailCustomer = '';
    this.customer.passwordCustomer = '';
  }
}
