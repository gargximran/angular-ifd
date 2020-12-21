import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './include/header/header.component';
import { HomeFooterComponent } from './include/footer/footer.component';
import { HomeLayoutComponent } from './layout/layout.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbCarouselModule, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { ListingByCategoryComponent } from './listing-by-category/listing-by-category.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ListByStateComponent } from './list-by-state/list-by-state.component';
import { ListByCityComponent } from './list-by-city/list-by-city.component';
import { ListByCategoryStateComponent } from './list-by-category-state/list-by-category-state.component';
import { ListByCategoryCityComponent } from './list-by-category-city/list-by-category-city.component';
import { SingleListingComponent } from './single-listing/single-listing.component';
import { MomentModule } from 'ngx-moment';
import { DirectoryPlaceholderComponent } from './directory/directory-placeholder/directory-placeholder.component';
import { DirectoryHomeComponent } from './directory/directory-home/directory-home.component';
import { DirectoryByCategoryComponent } from './directory/directory-by-category/directory-by-category.component';
import { DirectoryByStateComponent } from './directory/directory-by-state/directory-by-state.component';
import { DirectoryByCityComponent } from './directory/directory-by-city/directory-by-city.component';
import { DirectoryByCategoryStateComponent } from './directory/directory-by-category-state/directory-by-category-state.component';
import { DirectoryByCategoryCityComponent } from './directory/directory-by-category-city/directory-by-category-city.component';
import { DirectorySingleComponent } from './directory/directory-single/directory-single.component';

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
    SingleListingComponent,
    DirectoryPlaceholderComponent,
    DirectoryHomeComponent,
    DirectoryByCategoryComponent,
    DirectoryByStateComponent,
    DirectoryByCityComponent,
    DirectoryByCategoryStateComponent,
    DirectoryByCategoryCityComponent,
    DirectorySingleComponent
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
    MomentModule,
    NgbCarouselModule
  ],
})
export class HomeModule {}
