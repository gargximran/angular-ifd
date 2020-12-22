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
import {DirectoryPlaceholderComponent} from './directory/directory-placeholder/directory-placeholder.component';
import {DirectoryHomeComponent} from './directory/directory-home/directory-home.component';
import {DirectoryByCategoryComponent} from './directory/directory-by-category/directory-by-category.component';
import {DirectoryByStateComponent} from './directory/directory-by-state/directory-by-state.component';
import {DirectoryByCityComponent} from './directory/directory-by-city/directory-by-city.component';
import {DirectoryByCategoryStateComponent} from './directory/directory-by-category-state/directory-by-category-state.component';
import {DirectoryByCategoryCityComponent} from './directory/directory-by-category-city/directory-by-category-city.component';
import {DirectorySingleComponent} from './directory/directory-single/directory-single.component';
import {JobPlaceholderComponent} from './job/job-placeholder/job-placeholder.component';
import {JobHomeComponent} from './job/job-home/job-home.component';
import {JobByCategoryComponent} from './job/job-by-category/job-by-category.component';
import {JobByStateComponent} from './job/job-by-state/job-by-state.component';
import {JobByCityComponent} from './job/job-by-city/job-by-city.component';
import {JobByCategoryStateComponent} from './job/job-by-category-state/job-by-category-state.component';
import {JobByCategoryCityComponent} from './job/job-by-category-city/job-by-category-city.component';
import {JobSingleComponent} from './job/job-single/job-single.component';


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
      },
      {
        path: 'directory',
        component: DirectoryPlaceholderComponent,
        children: [
          {
            path: '',
            component: DirectoryHomeComponent
          },
          {
            path: 'category/:slug',
            component: DirectoryByCategoryComponent
          },
          {
            path: 'state/:slug',
            component: DirectoryByStateComponent
          },
          {
            path: 'city/:slug',
            component: DirectoryByCityComponent
          },
          {
            path: 'category/:cat_slug/state/:state_slug',
            component: DirectoryByCategoryStateComponent
          },
          {
            path: 'category/:cat_slug/city/:city_slug',
            component: DirectoryByCategoryCityComponent
          },
          {
            path: 'single/:post_slug',
            component: DirectorySingleComponent
          }
        ]
      },
      {
        path: 'job',
        component: JobPlaceholderComponent,
        children: [
          {
            path: '',
            component: JobHomeComponent
          },
          {
            path: 'category/:slug',
            component: JobByCategoryComponent
          },
          {
            path: 'state/:slug',
            component: JobByStateComponent
          },
          {
            path: 'city/:slug',
            component: JobByCityComponent
          },
          {
            path: 'category/:cat_slug/state/:state_slug',
            component: JobByCategoryStateComponent
          },
          {
            path: 'category/:cat_slug/city/:city_slug',
            component: JobByCategoryCityComponent
          },
          {
            path: 'single/:post_slug',
            component: JobSingleComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
