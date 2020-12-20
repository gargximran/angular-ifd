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
import { ListingByCategoryComponent } from './listing-by-category/listing-by-category.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListByStateComponent } from './list-by-state/list-by-state.component';
import { ListByCityComponent } from './list-by-city/list-by-city.component';
import { ListByCategoryStateComponent } from './list-by-category-state/list-by-category-state.component';
import { ListByCategoryCityComponent } from './list-by-category-city/list-by-category-city.component';
import { SingleListingComponent } from './single-listing/single-listing.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeComponent,
    HomeFooterComponent,
    HomeLayoutComponent,
    ListingByCategoryComponent,
    ListByStateComponent,
    ListByCityComponent,
    ListByCategoryStateComponent,
    ListByCategoryCityComponent,
    SingleListingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxTypedJsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    NgxPaginationModule,
    CarouselModule,
    MomentModule
  ],
})
export class HomeModule {}
