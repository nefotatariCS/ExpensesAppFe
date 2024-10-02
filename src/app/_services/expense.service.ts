import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AllExpnesesReponse, Expense } from '../_models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  getAllExpenses(token: string): Promise<AllExpnesesReponse> {
    const url = `${environment.apiUrl}/api/expenses/getAll`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };
    return this.http
      .get(url, options)
      .toPromise() as Promise<AllExpnesesReponse>;
  }

  async getExpenseById(userId: number, token: string): Promise<Expense> {
    const url = `${environment.apiUrl}/api/expenses/getExpenseById/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });
    const options = { headers };
    return this.http.get(url, options).toPromise() as Promise<Expense>;
  }

  async createNewExpense(token: string, newUserObject: any) {
    const url = `${environment.apiUrl}/api/expenses/addNew`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };

    try {
      const response = await this.http
        .post(url, newUserObject, options)
        .toPromise();
      if (response) {
        this.router.navigate(['/dashboard']);
      }
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async updateExpensesById(
    token: string,
    newUserObject: any,
    expenseId: number,
  ) {
    const url = `${environment.apiUrl}/api/expenses/updateExpensesById/${expenseId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };

    try {
      const response = await this.http
        .post(url, newUserObject, options)
        .toPromise();
      if (response) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}
