import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { url } from './env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  

  check(token: string): Observable<any>{
    if(token){
      return this.http.get(`${url}/auth/check`, {
        headers:{
          'auth-token':token
        }
      })
    }

  }

}
