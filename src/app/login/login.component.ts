import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http"
import { url } from '../env'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  headingText = "Sign In"

  constructor(private http: HttpClient) { }


  registerForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(""),
    username: new FormControl(''),
    gender: new FormControl(""),
    password: new FormControl("")
  })

  ngOnInit(): void {
  }

  changeHeading(value){
    this.headingText = value
  }

  submitRegister(){
    var formData = new FormData();
    formData.append('first_name', this.registerForm.get('first_name').value);
    formData.append('last_name', this.registerForm.get('last_name').value);
    formData.append('email', this.registerForm.get('email').value)
    formData.append('phone', this.registerForm.get('phone').value)
    formData.append('username', this.registerForm.get('username').value)
    formData.append("gender", this.registerForm.get('gender').value)
    formData.append('password', this.registerForm.get('password').value)

    console.log(formData);
    this.http.post(`${url}/user/register`, formData).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  toggleInModalAction(buttonActive, buttonClose, open, close){
    buttonActive.classList.add('active')
    buttonClose.classList.remove('active')
    open.style.display = ""
    close.style.display = "none"
  }

}
