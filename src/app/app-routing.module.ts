import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard'
import { NotauthGuard } from './notauth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    canActivate: [NotauthGuard],
    component: LoginComponent,
    
  },
  {
    path: "register",
    canActivate: [NotauthGuard],
    component: RegisterComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
