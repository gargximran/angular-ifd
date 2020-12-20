import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/layout.component';
import {HomeComponent} from './home/home.component';
import { ListingByCategoryComponent } from './listing-by-category/listing-by-category.component';
import { ListByStateComponent } from './list-by-state/list-by-state.component';
import { ListByCityComponent } from './list-by-city/list-by-city.component';
import { ListByCategoryStateComponent } from './list-by-category-state/list-by-category-state.component';
import { ListByCategoryCityComponent } from './list-by-category-city/list-by-category-city.component';
import { SingleListingComponent } from './single-listing/single-listing.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'category/:slug',
        component: ListingByCategoryComponent
      },
      {
        path: 'state/:slug',
        component: ListByStateComponent
      },
      {
        path: 'state/:slug',
        component: ListByStateComponent
      },
      {
        path: 'city/:slug',
        component: ListByCityComponent
      },
      {
        path: 'category/:cat_slug/state/:state_slug',
        component: ListByCategoryStateComponent
      },
      {
        path: 'category/:cat_slug/city/:city_slug',
        component: ListByCategoryCityComponent
      },
      {
        path: 'single/:post_slug',
        component: SingleListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
