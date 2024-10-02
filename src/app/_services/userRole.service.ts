import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AllUserRoleRepsonse, UserRole } from '../_models/userRoles';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  constructor(private http: HttpClient) {}

  getAllUserRoles(token: string): Promise<AllUserRoleRepsonse> {
    const url = `${environment.apiUrl}/api/userRole/getAll`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };
    return this.http
      .get(url, options)
      .toPromise() as Promise<AllUserRoleRepsonse>;
  }

  getUserRolesById(token: string, userRoleId: number): Promise<UserRole> {
    const url = `${environment.apiUrl}/api/userRole/getById/${userRoleId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };
    return this.http.get(url, options).toPromise() as Promise<UserRole>;
  }
}
