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


  constructor(private http: HttpClient) { }

  loginForm = new FormGroup({})

 

  ngOnInit(): void {
  }

  



}
