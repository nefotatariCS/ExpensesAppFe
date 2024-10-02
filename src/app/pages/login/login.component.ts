import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.error = 'Fill Fields';
      return;
    }

    this.error = '';
    this.loading = true;
    this.authenticationService
      .login(this.form['userName'].value, this.form['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          const userLogedIn = JSON.parse(localStorage['user']);
          const rolesOfUserLogedIn = userLogedIn.roles;
          if (rolesOfUserLogedIn == '') {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
