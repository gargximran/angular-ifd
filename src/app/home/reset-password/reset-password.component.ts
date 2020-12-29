import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {url} from '../../env';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }
  errorMessage: string;
  token: string;
  form = new FormGroup({
    password: new FormControl(''),
    confirm_password: new FormControl('')
  });
  loading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      const token = d.get('token');
      if (token){
        this.http.post<any>(url + '/user/get_reset/' + token, {}).subscribe(
          res => {
            this.token = res.data.token;
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      }
    });
  }

  reset(): void{
    this.loading = true;
    const form = new FormData();
    form.append('token', this.token || '');
    form.append('password', this.form.get('password').value || '');
    form.append('confirm_password', this.form.get('confirm_password').value || '');

    this.http.post<any>(url + '/user/reset_password', form).subscribe(
      res => {
        this.loading = false;
        localStorage.setItem('__auth_session__', JSON.stringify(res.data));
        this.toastr.success('Password Reset successful!');
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.loading = false;
        this.form.setErrors({...err.error.errors});
      }
    );
  }

}
