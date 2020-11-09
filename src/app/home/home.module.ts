import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './include/header/header.component';
import { HomeFooterComponent } from "./include/footer/footer.component"
import { HomeLayoutComponent } from "./layout/layout.component"
import { NgxTypedJsModule } from 'ngx-typed-js';



@NgModule({
  declarations: [HomeHeaderComponent, HomeComponent,HomeFooterComponent,HomeLayoutComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxTypedJsModule,
    
  ]
})
export class HomeModule { }