import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { url } from '../env';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, zoomIn } from 'ng-animate';
import { AuthService } from '../service/auth.service';
import { Response } from '../models/api_response';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade_in', [transition('void => *', useAnimation(fadeIn))]),
    trigger('zoom_in', [transition('void => *', useAnimation(zoomIn))]),
  ],
})
export class LoginComponent implements OnInit {
  loginSuccess = '';
  loginError = '';
  loading = false;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private api: ApiService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(''),
  });

  login() {
    let formData = new FormData();
    formData.append('email', this.loginForm.get('email').value);
    formData.append('password', this.loginForm.get('password').value);
    formData.append('remember', this.loginForm.get('remember').value);
    this.loading = true;
    this.loginError = ' ';
    this.loginSuccess = ' ';

    this.http.post(`${url}/user/login`, formData).subscribe(
      (res: Response) => {
        localStorage.setItem('__auth_session__', JSON.stringify(res.data));
        this.loginError = ' ';
        this.loginSuccess = 'Login Successfull ! Redirecting';
        let x = 1;
        let supperthis = this;
        supperthis.loading = false;
        function rec() {
          if (x < 4) {
            setTimeout(() => {
              supperthis.loginSuccess += '.';
              x++;
              rec();
            }, 400);
          } else {
            supperthis.router.navigateByUrl('/dashboard');
          }
        }

        rec();
      },
      (error: any) => {
        this.loading = false;
        this.loginSuccess = ' ';
        this.loginError = 'Unknown Credentials!';
      }
    );
  }

  ngOnInit(): void {
    this.api.get('/user/check').subscribe((res) => {
      if (res.status_code == 208) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
