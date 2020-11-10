import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let token = localStorage.getItem('xi-token');

    if (token) {
      let logged: boolean = await this.authService
        .check(token)
        .toPromise()
        .then((res) => {
          return true;
        })
        .catch((er) => {
          this.router.navigate(['/login']);
          return false;
        });
    }else{
      this.router.navigate(['/login']);
      return false
    }

  }
}
