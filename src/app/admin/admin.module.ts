import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './include/admin-header/admin-header.component';
import { AdminNavComponent } from './include/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './include/admin-footer/admin-footer.component';
import { AdminLayoutComponent } from './include/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { PlaceholderComponent } from './admin/placeholder/placeholder.component';
import { StatesComponent } from './admin/state/states/states.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CityComponent } from './admin/city/city/city.component';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminNavComponent,
    AdminFooterComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    PlaceholderComponent,
    StatesComponent,
    CityComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbProgressbarModule
  ],
})
export class AdminModule {}
