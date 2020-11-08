import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddListingComponent } from './admin-add-listing/admin-add-listing.component';
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
                path: 'add-listing',
                component: AdminAddListingComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
