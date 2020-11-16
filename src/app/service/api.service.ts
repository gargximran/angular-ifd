import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { url } from '../env';
import { Response } from '../models/api_response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = url;
  private ENDPOINT = '';
  private FULL_URL = '';
  private headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  public get(endpoint, params: HttpParams = null): Observable<Response> {
    this._set_url_(endpoint);
    this.setHeaders();
    return this.http.get<Response>(this.FULL_URL, {params, headers: this.headers}).pipe(
      map((resp) => {
        this.auth.setSession = resp;
        return resp;
      },
      catchError((err) => {
        if(!err.error.session){
          this.auth.logout()
        }
        return throwError(err.error)
      })
      )
    )
  }


  public post(endpoint, data, params: HttpParams = null): Observable<Response>{
    this._set_url_(endpoint);
    this.setHeaders();
    return this.http.post<Response>(this.FULL_URL, data, {params, headers:this.headers}).pipe(
      map(resp => {
        this.auth.setSession = resp;
        return resp;
      }),
      catchError(err => {
       
        if(!err.error.session){
          this.auth.logout()
        }
        return throwError(err.error)
      })
    )
  }


  private _set_url_(endpoint){
    this.ENDPOINT = endpoint;
    this.FULL_URL = `${this.BASE_URL}${this.ENDPOINT}`
  }


  private setHeaders(){
    let token;
    if(this.auth.token){
      this.headers = this.headers.set("auth-token", String(this.auth.token) || "notoken") 
    }
  }

}
