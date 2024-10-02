import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../../_services/user.service';
import { UserRoleService } from '../../_services/userRole.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userServiceMock: any;
  let userRoleServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', [
      'getUserById',
      'updateUserById',
      'createNewUser',
    ]);
    userServiceMock.getUserById.and.returnValue(
      Promise.resolve({
        name: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
        password: 'password123',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        gender: 'M',
        userRoleId: 1,
      }),
    );
    userServiceMock.updateUserById.and.returnValue(Promise.resolve());
    userServiceMock.createNewUser.and.returnValue(Promise.resolve());

    userRoleServiceMock = jasmine.createSpyObj('UserRoleService', [
      'getAllUserRoles',
    ]);
    userRoleServiceMock.getAllUserRoles.and.returnValue(
      Promise.resolve({
        userRoles: [
          { id: 1, userRoleDescription: 'Admin' },
          { id: 2, userRoleDescription: 'User' },
        ],
      }),
    );

    activatedRouteMock = {
      queryParams: of({ userId: '1', action: 'update' }), // Mock query parameters
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ accessToken: 'mockAccessToken' });
      }
      return null;
    });

    await TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        DropdownModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: UserRoleService, useValue: userRoleServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form as invalid when fields are empty', () => {
    component.userForm.controls['name'].setValue('');
    component.userForm.controls['lastName'].setValue('');
    component.userForm.controls['userName'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['phoneNumber'].setValue('');
    component.userForm.controls['gender'].setValue('');
    component.userForm.controls['userRole'].setValue('');
    expect(component.userForm.invalid).toBeTrue();
  });

  it('should validate the form as valid when fields are filled', () => {
    component.userForm.controls['name'].setValue('John');
    component.userForm.controls['lastName'].setValue('Doe');
    component.userForm.controls['userName'].setValue('johndoe');
    component.userForm.controls['password'].setValue('password123');
    component.userForm.controls['email'].setValue('john.doe@example.com');
    component.userForm.controls['phoneNumber'].setValue('1234567890');
    component.userForm.controls['gender'].setValue({
      id: 2,
      name: 'Male',
      code: 'M',
    });
    component.userForm.controls['userRole'].setValue({
      id: 1,
      userRoleDescription: 'Admin',
    });
    expect(component.userForm.valid).toBeTrue();
  });

  it('should call getUserById if userId is present', () => {
    component.ngOnInit();
    expect(userServiceMock.getUserById).toHaveBeenCalledWith(
      1,
      'mockAccessToken',
    );
  });

  it('should call createNewUser when action is not update', async () => {
    component.userForm.controls['name'].setValue('John');
    component.userForm.controls['lastName'].setValue('Doe');
    component.userForm.controls['userName'].setValue('johndoe');
    component.userForm.controls['password'].setValue('password123');
    component.userForm.controls['email'].setValue('john.doe@example.com');
    component.userForm.controls['phoneNumber'].setValue('1234567890');
    component.userForm.controls['gender'].setValue({
      id: 2,
      name: 'Male',
      code: 'M',
    });
    component.userForm.controls['userRole'].setValue({
      id: 1,
      userRoleDescription: 'Admin',
    });

    component.action = '';
    await component.onSubmit();
    expect(userServiceMock.createNewUser).toHaveBeenCalled();
  });

  it('should call updateUserById when action is update', async () => {
    component.userForm.controls['name'].setValue('John');
    component.userForm.controls['lastName'].setValue('Doe');
    component.userForm.controls['userName'].setValue('johndoe');
    component.userForm.controls['password'].setValue('password123');
    component.userForm.controls['email'].setValue('john.doe@example.com');
    component.userForm.controls['phoneNumber'].setValue('1234567890');
    component.userForm.controls['gender'].setValue({
      id: 2,
      name: 'Male',
      code: 'M',
    });
    component.userForm.controls['userRole'].setValue({
      id: 1,
      userRoleDescription: 'Admin',
    });

    component.action = 'update';
    component.updatedUserId = 1;
    await component.onSubmit();
    expect(userServiceMock.updateUserById).toHaveBeenCalledWith(
      'mockAccessToken',
      jasmine.objectContaining({
        name: 'John',
        lastName: 'Doe',
        userName: 'johndoe',
      }),
      1,
    );
  });

  it('should set error message if form is invalid on submit', () => {
    component.userForm.controls['name'].setValue('');
    component.onSubmit();
    expect(component.error).toBe('Fill all fields');
  });

  it('should call getAllUserRoles on ngOnInit', () => {
    component.ngOnInit();
    expect(userRoleServiceMock.getAllUserRoles).toHaveBeenCalledWith(
      'mockAccessToken',
    );
  });
});
