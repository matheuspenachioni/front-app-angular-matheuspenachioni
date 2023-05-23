import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
//Customer Routes
import { CustomerListComponent } from './screens/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './screens/customer/customer-create/customer-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //Customer Routes
  { path: 'customer', component: CustomerListComponent },
  { path: 'customer/save', component: CustomerCreateComponent },
  { path: 'customer/save/:id', component: CustomerCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
