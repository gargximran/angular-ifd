import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http"
import { url } from '../env'
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('fade_in', [transition('void => *', useAnimation(fadeIn))])
  ]
})
export class LoginComponent implements OnInit {

  loginError = ''
  constructor(private http: HttpClient) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl('')
  })

  login(){

    interface DataLogin{
      token: string;
    }

    interface ResponseLogin{
      data: DataLogin;
      error: object;
      message: string;
      status: string;
    }

    let formData = new FormData()
    formData.append('email', this.loginForm.get('email').value)
    formData.append('password', this.loginForm.get('password').value)
    formData.append('remember', this.loginForm.get('remember').value)
    
    this.http.post(`${url}/user/login`, formData).subscribe((res: ResponseLogin) => {
      localStorage.setItem('xi-token', res.data.token)
    }, (error: any) => {
      this.loginError = "Unknown Credentials!"
    })
    
    
    
    
    
    
   
    
   
  }

 

  ngOnInit(): void {
  }

  



}
