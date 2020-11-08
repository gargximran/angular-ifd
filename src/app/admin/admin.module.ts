import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminHeaderComponent } from './include/admin-header/admin-header.component';
import { AdminNavComponent } from './include/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './include/admin-footer/admin-footer.component';
import { AdminLayoutComponent } from './include/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminAddListingComponent } from './admin-add-listing/admin-add-listing.component';




@NgModule({
  declarations: [AdminHeaderComponent, AdminNavComponent, AdminFooterComponent, AdminLayoutComponent, AdminDashboardComponent, AdminAddListingComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
