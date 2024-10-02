import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ExpenseService } from './expense.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AllExpnesesReponse, Expense } from '../_models/expense';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let httpMock: HttpTestingController;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpenseService, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all expenses', async () => {
    const mockResponse: AllExpnesesReponse = {
      expenses: [
        {
          id: 1,
          description: 'Rent',
          amount: 1000,
          transactionDate: new Date(),
        },
        {
          id: 2,
          description: 'Utilities',
          amount: 150,
          transactionDate: new Date(),
        },
      ],
    };
    const token = 'mockToken';

    service.getAllExpenses(token).then((response) => {
      expect(response.expenses!.length).toBe(2);
      expect(response.expenses).toEqual(mockResponse.expenses);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/expenses/getAll`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(mockResponse);
  });

  it('should retrieve an expense by ID', async () => {
    const mockExpense: Expense = {
      id: 1,
      description: 'Rent',
      amount: 1000,
      transactionDate: new Date(),
    };
    const token = 'mockToken';
    const expenseId = 1;

    service.getExpenseById(expenseId, token).then((response) => {
      expect(response).toEqual(mockExpense);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/api/expenses/getExpenseById/${expenseId}`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(mockExpense);
  });

  it('should create a new expense and navigate to /dashboard', async () => {
    const newExpenseObject = {
      description: 'New Expense',
      amount: 200,
      transactionDate: new Date(),
    };
    const token = 'mockToken';

    service.createNewExpense(token, newExpenseObject).then((response) => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/expenses/addNew`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush({});
  });

  it('should update an expense by ID and navigate to /dashboard', async () => {
    const updatedExpenseObject = {
      description: 'Updated Expense',
      amount: 300,
      transactionDate: new Date(),
    };
    const token = 'mockToken';
    const expenseId = 1;

    service
      .updateExpensesById(token, updatedExpenseObject, expenseId)
      .then(() => {
        expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/api/expenses/updateExpensesById/${expenseId}`,
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush({});
  });
});
