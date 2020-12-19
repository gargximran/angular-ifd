import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './include/header/header.component';
import { HomeFooterComponent } from './include/footer/footer.component';
import { HomeLayoutComponent } from './layout/layout.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeComponent,
    HomeFooterComponent,
    HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxTypedJsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    NgxPaginationModule
  ],
})
export class HomeModule {}
