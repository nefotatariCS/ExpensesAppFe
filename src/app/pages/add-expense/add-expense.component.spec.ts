import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddExpenseComponent } from './add-expense.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { ExpenseService } from 'src/app/_services/expense.service';
import { of } from 'rxjs';

describe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;
  let expenseServiceMock: any;

  beforeEach(async () => {
    expenseServiceMock = jasmine.createSpyObj('ExpenseService', [
      'getExpenseById',
      'updateExpensesById',
      'createNewExpense',
    ]);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ accessToken: 'mockAccessToken' });
      }
      return null;
    });

    await TestBed.configureTestingModule({
      declarations: [AddExpenseComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CalendarModule,
      ],
      providers: [{ provide: ExpenseService, useValue: expenseServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.expenseForm.value).toEqual({
      description: '',
      currency: '',
      amount: '',
      transactionDate: '',
    });
  });

  it('should validate the form as invalid when fields are empty', () => {
    component.expenseForm.controls['description'].setValue('');
    component.expenseForm.controls['currency'].setValue('');
    component.expenseForm.controls['amount'].setValue('');
    component.expenseForm.controls['transactionDate'].setValue('');
    expect(component.expenseForm.invalid).toBeTrue();
  });

  it('should validate the form as valid when fields are filled', () => {
    component.expenseForm.controls['description'].setValue('Test Description');
    component.expenseForm.controls['currency'].setValue('USD');
    component.expenseForm.controls['amount'].setValue('100');
    component.expenseForm.controls['transactionDate'].setValue(new Date());
    expect(component.expenseForm.valid).toBeTrue();
  });

  it('should call createNewExpense when action is not update', async () => {
    component.expenseForm.controls['description'].setValue('Test Description');
    component.expenseForm.controls['currency'].setValue('USD');
    component.expenseForm.controls['amount'].setValue('100');
    component.expenseForm.controls['transactionDate'].setValue(new Date());

    component.action = '';
    expenseServiceMock.createNewExpense.and.returnValue(Promise.resolve());

    await component.onSubmit();
    expect(expenseServiceMock.createNewExpense).toHaveBeenCalled();
  });

  it('should call updateExpensesById when action is update', async () => {
    component.expenseForm.controls['description'].setValue('Test Description');
    component.expenseForm.controls['currency'].setValue('USD');
    component.expenseForm.controls['amount'].setValue('100');
    component.expenseForm.controls['transactionDate'].setValue(new Date());

    component.action = 'update';
    component.updatedExpenseId = 1;
    expenseServiceMock.updateExpensesById.and.returnValue(Promise.resolve());

    await component.onSubmit();
    expect(expenseServiceMock.updateExpensesById).toHaveBeenCalledWith(
      'mockAccessToken',
      jasmine.objectContaining({
        description: 'Test Description',
        currency: 'USD',
        amount: '100',
      }),
      1,
    );
  });

  it('should set error message if form is invalid on submit', () => {
    component.expenseForm.controls['description'].setValue('');
    component.onSubmit();
    expect(component.error).toBe('Fill all fields');
  });
});
