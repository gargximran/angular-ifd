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
    this.http.post(`${url}/user/register`, this.registerForm.value, {
      headers: {
        'Content-Type': "multipart/form-data;",
        'Accept': "*/*",
        "Access-Control-Allow-Origin": "*"

      }
    }).subscribe(res => {
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
