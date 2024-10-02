import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { UserComponent } from './pages/user/user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'addExpense',
    component: AddExpenseComponent,
  },
  {
    path: 'editExistingExpense',
    component: AddExpenseComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'addUser',
    component: AddUserComponent,
  },
  {
    path: 'editExistingUser',
    component: AddUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
