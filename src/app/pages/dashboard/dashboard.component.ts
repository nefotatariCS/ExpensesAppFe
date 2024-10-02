import { Component } from '@angular/core';
import { AllExpnesesReponse, Expense } from 'src/app/_models/expense';
import { ExpenseService } from 'src/app/_services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  allExpensesResponse: AllExpnesesReponse | undefined;
  expenses: Expense[] | undefined | any;

  userObject: any;
  accessToken: string | undefined;

  first = 0;
  rows = 10;

  constructor(private expenseService: ExpenseService) {
    // Safely parse the localStorage user item
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        this.userObject = JSON.parse(userString);
        this.accessToken = this.userObject.accessToken;
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }

  async ngOnInit(): Promise<void> {
    if (this.accessToken) {
      await this.expenseService
        .getAllExpenses(this.accessToken)
        .then((data) => {
          this.allExpensesResponse = data;
          this.expenses = this.allExpensesResponse.expenses;
        });
    } else {
      console.error('Access token is missing');
    }
  }
}
