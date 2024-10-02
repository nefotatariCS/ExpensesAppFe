import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TableModule } from 'primeng/table';
import { ExpenseService } from 'src/app/_services/expense.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let expenseServiceMock: any;

  beforeEach(async () => {
    expenseServiceMock = jasmine.createSpyObj('ExpenseService', [
      'getAllExpenses',
    ]);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ accessToken: 'mockAccessToken' });
      }
      return null;
    });

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientModule, RouterTestingModule, TableModule],
      providers: [{ provide: ExpenseService, useValue: expenseServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse localStorage to get userObject and accessToken', () => {
    expect(component.userObject).toEqual({ accessToken: 'mockAccessToken' });
    expect(component.accessToken).toBe('mockAccessToken');
  });

  it('should log an error if accessToken is missing', async () => {
    spyOn(console, 'error');
    component.accessToken = undefined; // Simulate missing accessToken
    await component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Access token is missing');
  });

  it('should call getAllExpenses if accessToken is present', async () => {
    const mockExpenses = {
      expenses: [
        {
          id: 1,
          description: 'Test Expense 1',
          amount: 100,
          transactionDate: new Date(),
        },
        {
          id: 2,
          description: 'Test Expense 2',
          amount: 200,
          transactionDate: new Date(),
        },
      ],
    };
    expenseServiceMock.getAllExpenses.and.returnValue(
      Promise.resolve(mockExpenses),
    );

    await component.ngOnInit();

    expect(expenseServiceMock.getAllExpenses).toHaveBeenCalledWith(
      'mockAccessToken',
    );
    expect(component.allExpensesResponse).toEqual(mockExpenses);
    expect(component.expenses).toEqual(mockExpenses.expenses);
  });

  it('should log an error if localStorage does not contain user data', () => {
    localStorage.getItem = jasmine.createSpy().and.callFake((key: string) => {
      if (key === 'user') {
        return null; // Simulate no user data in localStorage
      }
      return null;
    });
    spyOn(console, 'error');
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith(
      'No user data found in localStorage',
    );
  });
});
