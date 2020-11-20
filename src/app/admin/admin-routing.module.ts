import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { BrandComponent } from './admin/brand/brand/brand.component';
import { CityComponent } from './admin/city/city/city.component';
import { PlaceholderComponent } from './admin/placeholder/placeholder.component';
import { StatesComponent } from './admin/state/states/states.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './include/admin-layout/admin-layout.component';
import {ClassifiedCategoryComponent} from './admin/classified-category/classified-category.component';

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
export class AdminRoutingModule {}
