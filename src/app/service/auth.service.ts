import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Response } from '../models/api_response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    public router: Router, private toastr: ToastrService
  ) { }

  public set setSession(request: Response){
    if (request.session){
      localStorage.setItem('__auth_session__', JSON.stringify(request.session));
    }
  }

  public get token(): any{
    let token;
    this.watchSession().subscribe(d => token = d?.token);
    return token;
  }

  public get isLoggedIn(): boolean {
    return this.token;
  }

  public logout(): void{
    if (this.isLoggedIn){
      localStorage.removeItem('__auth_session__');
      this.toastr.error('Logged Out!');
      this.router.navigateByUrl('/');
    }else {
      localStorage.removeItem('__auth_session__');
      this.router.navigateByUrl('/');
    }
  }

  public isAdmin(): boolean{
    if (this._getUser_()){
      if (this._getUser_().type.role === 'admin'){
        return true;
      }
    }
  }

  public isCompany(): boolean{
    if (this._getUser_()){
      // tslint:disable-next-line:triple-equals
      if (this._getUser_().type.role === 'client' && this._getUser_().type.client_type == 'company'){
        return true;
      }
    }
  }

  public get UserName(): string{
    if (this.isProfessional()){
      return this._getSession_().user.first_name + ' ' + this._getSession_().user.last_name;
    }
    return null;
  }

  public isProfessional(): boolean{
    if (this._getUser_()){
      // tslint:disable-next-line:triple-equals
      if (this._getUser_().type.role === 'client' && this._getUser_().type.client_type == 'professional'){
        return true;
      }
    }
  }

  public get CompanyProfile(): any{
    if (this.isCompany()){
      return this._getSession_().user.profile;
    }
    return null;
  }

  public get ProfessionalProfile(): any{
    if (this.isProfessional()){
      return this._getSession_().user.profile;
    }
    return null;
  }

  private watchUser(): Observable<any> {
    return of(this._getUser_());
  }

  public _getUser_(): any{
    if (this._getSession_()){
      return this._getSession_().user;
    }
  }


  private watchSession(): Observable<any>{
    return of(this._getSession_());
  }


  private _getSession_(): any{
    if (localStorage.getItem('__auth_session__')){
      return JSON.parse(localStorage.getItem('__auth_session__'));
    }
  }


}
