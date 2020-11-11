import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotauthGuard implements CanActivate {
  constructor(public router: Router, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let token = localStorage.getItem('xi-token');

    if (token) {
      try {
        let logged: boolean = await this.authService
          .check(token)
          .toPromise()
          .then((data) => {
            console.log(data)
            this.router.navigate(['/dashboard']);
            return false;
          });
      } catch (e) {
        console.log(e)
        return true;
      }
    } else {
      return true;
    }
  }
}
