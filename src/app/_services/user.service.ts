import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AllUsersResponse, User } from '../_models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  getAllUsers(token: string): Promise<AllUsersResponse> {
    const url = `${environment.apiUrl}/api/user/getAll`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };
    return this.http.get(url, options).toPromise() as Promise<AllUsersResponse>;
  }

  async createNewUser(token: string, newUserObject: any) {
    const url = `${environment.apiUrl}/api/auth/signup`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };

    try {
      const response = await this.http
        .post(url, newUserObject, options)
        .toPromise();
      if (response) {
        this.router.navigate(['/user']);
      }
      return response;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getUserById(userId: number, token: string): Promise<User> {
    const url = `${environment.apiUrl}/api/user/getUserById/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });
    const options = { headers };
    return this.http.get(url, options).toPromise() as Promise<User>;
  }

  async updateUserById(
    token: string,
    newUserObject: any,
    updatedUserId: number,
  ) {
    const url = `${environment.apiUrl}/api/user/updateUserById/${updatedUserId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token,
    });

    const options = { headers };

    try {
      const response = await this.http
        .post(url, newUserObject, options)
        .toPromise();
      if (response) {
        this.router.navigate(['/user']);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}
