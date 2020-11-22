import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Response } from '../models/api_response'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    public router: Router, private toastr: ToastrService
  ) { }

  public set setSession(request: Response){
    if(request.session){
      localStorage.setItem("__auth_session__", JSON.stringify(request.session))
    }
  }

  public get token(){
    let token;
    this.watchSession().subscribe(d => token = d?.token)
    return token
  }

  public get isLoggedIn(): boolean {
    return this.token
  }

  public logout(){
    localStorage.removeItem("__auth_session__");    
    this.toastr.error('Your are logged out!')
    this.router.navigateByUrl('/');
  }

  public isAdmin(){
    if(this._getUser_()){
      if(this._getUser_().type == 'admin'){
        return true
      }
    }
  }

  private watchUser(): Observable<any> {
    return of(this._getUser_())
  }

  private _getUser_(){
    if(this._getSession_()){
      return this._getSession_().user
    }
  }


  private watchSession(): Observable<any>{
    return of(this._getSession_());
  }


  private _getSession_(){
    if(localStorage.getItem('__auth_session__')){
      return JSON.parse(localStorage.getItem('__auth_session__'))
    }
  }


}
