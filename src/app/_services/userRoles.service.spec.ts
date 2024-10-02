import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserRoleService } from './userRole.service';
import { environment } from '../../environments/environment';
import { AllUserRoleRepsonse, UserRole } from '../_models/userRoles';

describe('UserRoleService', () => {
  let service: UserRoleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRoleService],
    });

    service = TestBed.inject(UserRoleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all user roles', async () => {
    const mockResponse: AllUserRoleRepsonse = {
      userRoles: [
        { id: 1, userRoleDescription: 'Admin' },
        { id: 2, userRoleDescription: 'User' },
      ],
    };
    const token = 'mockToken';

    service.getAllUserRoles(token).then((response) => {
      expect(response.userRoles!.length).toBe(2);
      expect(response.userRoles).toEqual(mockResponse.userRoles);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/userRole/getAll`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(mockResponse);
  });

  it('should retrieve user role by ID', async () => {
    const mockRole: UserRole = { id: 1, userRoleDescription: 'Admin' };
    const token = 'mockToken';
    const userRoleId = 1;

    service.getUserRolesById(token, userRoleId).then((response) => {
      expect(response).toEqual(mockRole);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/api/userRole/getById/${userRoleId}`,
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-access-token')).toBe(token);
    req.flush(mockRole);
  });
});
