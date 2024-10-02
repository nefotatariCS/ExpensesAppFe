import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AllUsersResponse, User } from '../_models/users';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: Router, useValue: routerMock }],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all users', async () => {
    const mockResponse: AllUsersResponse = {
      users: [
        { id: 1, userName: 'JohnDoe', email: 'john@example.com' },
        { id: 2, userName: 'JaneDoe', email: 'jane@example.com' },
      ],
    };
    const token = 'mockToken';

    service.getAllUsers(token).then((response) => {
      expect(response.users!.length).toBe(2);
      expect(response.users).toEqual(mockResponse.users);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/user/getAll`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(mockResponse);
  });

  it('should create a new user and navigate to /user', async () => {
    const newUserObject = { userName: 'newUser', password: 'password' };
    const token = 'mockToken';

    service.createNewUser(token, newUserObject).then((response) => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/user']);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/signup`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush({});
  });

  it('should retrieve user by ID', async () => {
    const mockUser: User = {
      id: 1,
      userName: 'JohnDoe',
      email: 'john@example.com',
    };
    const token = 'mockToken';
    const userId = 1;

    service.getUserById(userId, token).then((response) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/api/user/getUserById/${userId}`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(mockUser);
  });

  it('should update user by ID and navigate to /user', async () => {
    const updatedUserObject = {
      userName: 'updatedUser',
      password: 'newPassword',
    };
    const token = 'mockToken';
    const userId = 1;

    service.updateUserById(token, updatedUserObject, userId).then(() => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/user']);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/api/user/updateUserById/${userId}`,
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush({});
  });
});
