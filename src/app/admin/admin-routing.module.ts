import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './admin/city/city/city.component';
import { PlaceholderComponent } from './admin/placeholder/placeholder.component';
import { StatesComponent } from './admin/state/states/states.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './include/admin-layout/admin-layout.component';

const routes: Routes = [
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: AdminDashboardComponent
            },
            {
                path: 'admin-dashboard',
                component: PlaceholderComponent,
                children:[
                    {
                        path: 'states',
                        component: StatesComponent
                    },
                    {
                        path:"cities",
                        component: CityComponent
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
