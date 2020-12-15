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
import { BrandComponent } from './admin/brand/brand/brand.component';
import { ClassifiedCategoryComponent } from './admin/classified-category/classified-category.component';
import {Select2Module} from 'ng-select2-component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DirectoryCategoryComponent } from './admin/directory-category/directory-category.component';
import { DirectoryItemComponent } from './admin/directory-item/directory-item.component';
import {ImageUploadModule} from 'angular2-image-upload';
import {ReadMoreModule} from 'ng-readmore';
import { ClassifiedItemComponent } from './admin/classified-item/classified-item.component';
import { JobCategoryComponent } from './admin/job-category/job-category.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { ProfessionalProfileComponent } from './professional-profile/professional-profile.component';

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
    BrandComponent,
    ClassifiedCategoryComponent,
    DirectoryCategoryComponent,
    DirectoryItemComponent,
    ClassifiedItemComponent,
    JobCategoryComponent,
    CompanyProfileComponent,
    ProfessionalProfileComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        NgbProgressbarModule,
        Select2Module,
        NgxPaginationModule,
        SweetAlert2Module.forRoot(),
        ImageUploadModule.forRoot(),
        ReadMoreModule
    ],
})
export class AdminModule {}
