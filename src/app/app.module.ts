//Imports padrão do Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
//Outros Imports
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService } from 'ngx-mask'
//Imports para os Components
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
//Imports para as Screens
import { HomeComponent } from './screens/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Imports para Customer
import { CustomerListComponent } from './screens/customer/customer-list/customer-list.component';
import { CustomerService } from './services/customer.service';
import { CustomerCreateComponent } from './screens/customer/customer-create/customer-create.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
//
import { ProductListComponent } from './screens/product/product-list/product-list.component';
import { ProductCreateComponent } from './screens/product/product-create/product-create.component';
//
import { CategoryListComponent } from './screens/category/category-list/category-list.component';
import { CategoryCreateComponent } from './screens/category/category-create/category-create.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    HomeComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    ConfirmationDialogComponent,
    ProductListComponent,
    ProductCreateComponent,
    CategoryListComponent,
    CategoryCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    DatePipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  exports: [
    ConfirmationDialogComponent
  ],
  providers: [
    CustomerService,
    NgxMaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
