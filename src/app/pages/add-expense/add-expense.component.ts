import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/_services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  expenseForm!: FormGroup;
  error = '';
  action = '';
  updatedExpenseId!: number;

  userObject: any;
  accessToken: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
  ) {
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

    this.expenseForm = this.formBuilder.group({
      description: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.updatedExpenseId = Number(params['expenseId']);
      this.action = params['action'];

      if (
        this.updatedExpenseId !== undefined &&
        !isNaN(this.updatedExpenseId)
      ) {
        if (this.accessToken) {
          this.expenseService
            .getExpenseById(this.updatedExpenseId, this.accessToken)
            .then((expenseData) => {
              this.expenseForm.patchValue(expenseData);
              this.expenseForm.controls['transactionDate'].setValue(
                new Date(expenseData.transactionDate),
              );
            })
            .catch((error: any) => {
              console.error('Error getting expense by ID', error);
            });
        } else {
          console.error('Access token is missing');
        }
      } else {
        console.error('Invalid or missing expense ID:', this.updatedExpenseId);
      }
    });
  }

  onSubmit() {
    if (this.expenseForm.invalid) {
      this.error = 'Fill all fields';
      return;
    }

    this.error = '';
    const formDataValue = this.expenseForm.value;
    const newExpenseObject = {
      description: formDataValue.description,
      currency: formDataValue.currency,
      amount: formDataValue.amount,
      transactionDate: formDataValue.transactionDate,
    };

    if (this.accessToken) {
      if (this.action === 'update') {
        this.expenseService
          .updateExpensesById(
            this.accessToken,
            newExpenseObject,
            this.updatedExpenseId,
          )
          .then((response) => {
            console.log('Expense updated successfully:', response);
          })
          .catch((error) => {
            console.error('Error updating expense:', error);
            this.error = error;
          });
      } else {
        this.expenseService
          .createNewExpense(this.accessToken, newExpenseObject)
          .then((response) => {
            console.log('Expense created successfully:', response);
          })
          .catch((error) => {
            console.error('Error creating expense:', error);
            this.error = error;
          });
      }
    } else {
      console.error('Access token is missing');
    }
  }
}
