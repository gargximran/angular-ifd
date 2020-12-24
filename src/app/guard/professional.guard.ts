import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalGuard implements CanActivate {
  constructor(private auth: AuthService, private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.isProfessional()){
        this.toastr.warning('Unauthorized Action!');
        this.auth.logout();
        return false;
      } else {
        return true;
      }
  }
}
