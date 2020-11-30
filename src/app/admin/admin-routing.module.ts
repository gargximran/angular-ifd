import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../guard/admin.guard';
import {BrandComponent} from './admin/brand/brand/brand.component';
import {CityComponent} from './admin/city/city/city.component';
import {PlaceholderComponent} from './admin/placeholder/placeholder.component';
import {StatesComponent} from './admin/state/states/states.component';
import {AdminDashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from './include/admin-layout/admin-layout.component';
import {ClassifiedCategoryComponent} from './admin/classified-category/classified-category.component';
import {DirectoryCategoryComponent} from './admin/directory-category/directory-category.component';
import {DirectoryItemComponent} from './admin/directory-item/directory-item.component';
import { ClassifiedItemComponent } from './admin/classified-item/classified-item.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'admin-dashboard',
        component: PlaceholderComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: 'states',
            component: StatesComponent
          },
          {
            path: 'cities',
            component: CityComponent
          },
          {
            path: 'cities/:state',
            component: CityComponent
          },
          {
            path: 'brands',
            component: BrandComponent
          },
          {
            path: 'classified_category',
            component: ClassifiedCategoryComponent
          },
          {
            path: 'classified_category/child/:parent',
            component: ClassifiedCategoryComponent
          },
          {
            path: 'directory_category',
            component: DirectoryCategoryComponent
          },
          {
            path: 'directory_category/child/:parent',
            component: DirectoryCategoryComponent
          },
          {
            path: 'directory_item',
            component: DirectoryItemComponent
          },
          {
            path: 'classified_item',
            component: ClassifiedItemComponent
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
export class AdminRoutingModule {
}
