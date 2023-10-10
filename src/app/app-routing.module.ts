import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  //login
  {
  path : "", component: LoginComponent
  },
  //dashboard
  {
    path: "dashboard", component: DashboardComponent
  },
  //register
  {
    path: "register", component: RegisterComponent
  },
  //transactions
  {
    path: "transactions", component: TransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
