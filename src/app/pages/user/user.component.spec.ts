import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../_services/user.service';
import { UserRoleService } from '../../_services/userRole.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { TableModule } from 'primeng/table';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceMock: any;
  let userRoleServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getAllUsers']);
    userRoleServiceMock = jasmine.createSpyObj('UserRoleService', [
      'getAllUserRoles',
    ]);

    // Mock localStorage to return a valid user object
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify({ accessToken: 'mockAccessToken' });
      }
      return null;
    });

    // Mock responses from services
    userRoleServiceMock.getAllUserRoles.and.returnValue(
      Promise.resolve({
        userRoles: [
          { id: 1, userRoleDescription: 'Admin' },
          { id: 2, userRoleDescription: 'User' },
        ],
      }),
    );

    userServiceMock.getAllUsers.and.returnValue(
      Promise.resolve({
        users: [
          { id: 1, userName: 'john', userRoleId: 1 },
          { id: 2, userName: 'jane', userRoleId: 2 },
        ],
      }),
    );

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientModule, RouterTestingModule, TableModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: UserRoleService, useValue: userRoleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set all user roles on initialization', async () => {
    await component.ngOnInit();
    expect(userRoleServiceMock.getAllUserRoles).toHaveBeenCalledWith(
      'mockAccessToken',
    );
    expect(component.allUserRoles.length).toBe(2); // Check if user roles were set correctly
  });

  it('should fetch and set all users on initialization', async () => {
    await component.ngOnInit();
    expect(userServiceMock.getAllUsers).toHaveBeenCalledWith('mockAccessToken');
    expect(component.allUsers.length).toBe(2); // Check if users were set correctly
  });
});
