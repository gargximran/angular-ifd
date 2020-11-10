import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { url } from '../env';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn} from 'ng-animate'
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations:[
    trigger('fade_in', [transition('void => *', useAnimation(fadeIn))]),
    trigger('slide_in_up', [transition('void => *', useAnimation(fadeIn))]),
  ]
})
export class RegisterComponent implements OnInit {

  @ViewChild('selectedGender') SelectGender;

  loading='Submit'

  error = {
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    gender: false,
    username: false,
    password: false
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {    
    this.SelectGender.nativeElement.selected = true
  }

  registerForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(""),
    username: new FormControl(''),
    gender: new FormControl(""),
    password: new FormControl("")
  })


  submitRegister(){
    var formData = new FormData();
    formData.append('first_name', this.registerForm.get('first_name').value);
    formData.append('last_name', this.registerForm.get('last_name').value);
    formData.append('email', this.registerForm.get('email').value)
    formData.append('phone', this.registerForm.get('phone').value)
    formData.append('username', this.registerForm.get('username').value)
    formData.append("gender", this.registerForm.get('gender').value)
    formData.append('password', this.registerForm.get('password').value)

    this.loading="Loading..."
    this.http.post(`${url}/user/register`, formData).subscribe(res => {
      this.loading="Submit"
      this.router.navigate(['/login']);
    }, err => {
      this.loading="Submit"
      this.error = err.error.errors

    })
  }

}
