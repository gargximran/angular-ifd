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
import { ClassifiedItemComponent } from './admin/classified-item/classified-item.component';
import { JobCategoryComponent } from './admin/job-category/job-category.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { ProfessionalProfileComponent } from './professional-profile/professional-profile.component';
import { ClassifiedProductComponent } from './classified-product/classified-product.component';
import { CompanyJobComponent } from './company-job/company-job.component';
import { ProfessionalJobAppliedComponent } from './professional-job-applied/professional-job-applied.component';
import { JobApplicantsComponent } from './job-applicants/job-applicants.component';
import { SingleApplicationJobComponent } from './single-application-job/single-application-job.component';
import {MomentModule} from 'ngx-moment';
import { JobApprovalComponent } from './admin/job-approval/job-approval.component';
import { PendingDirectoriesComponent } from './admin/pending-directories/pending-directories.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ActiveUsersComponent } from './admin/active-users/active-users.component';
import { DeactivatedUsersComponent } from './admin/deactivated-users/deactivated-users.component';
import { AdminControlComponent } from './admin/admin-control/admin-control.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

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
    ClassifiedProductComponent,
    CompanyJobComponent,
    ProfessionalJobAppliedComponent,
    JobApplicantsComponent,
    SingleApplicationJobComponent,
    JobApprovalComponent,
    PendingDirectoriesComponent,
    MyProfileComponent,
    ActiveUsersComponent,
    DeactivatedUsersComponent,
    AdminControlComponent,
    PortfolioComponent,
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
        MomentModule
    ],
})
export class AdminModule {}
