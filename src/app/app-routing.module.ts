import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
//Customer Routes
import { CustomerListComponent } from './screens/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './screens/customer/customer-create/customer-create.component';
//Product Routes
import { ProductListComponent } from './screens/product/product-list/product-list.component';
import { ProductCreateComponent } from './screens/product/product-create/product-create.component';
//Category Routes
import { CategoryListComponent } from './screens/category/category-list/category-list.component';
import { CategoryCreateComponent } from './screens/category/category-create/category-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //Customer Routes
  { path: 'customer', component: CustomerListComponent },
  { path: 'customer/save', component: CustomerCreateComponent },
  { path: 'customer/save/:id', component: CustomerCreateComponent },
  //Product Routes
  { path: 'product', component: ProductListComponent },
  { path: 'product/save', component: ProductCreateComponent },
  { path: 'product/save/:id', component: ProductCreateComponent },
  //Category Routes
  { path: 'category', component: CategoryListComponent },
  { path: 'category/save', component: CategoryCreateComponent },
  { path: 'category/save/:id', component: CategoryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
