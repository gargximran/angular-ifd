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
import {JobCategoryComponent} from './admin/job-category/job-category.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CompanyGuard } from '../guard/company.guard';
import { ProfessionalProfileComponent } from './professional-profile/professional-profile.component';
import { ProfessionalGuard } from '../guard/professional.guard';
import { ClassifiedProductComponent } from './classified-product/classified-product.component';
import {CompanyJobComponent} from './company-job/company-job.component';
import {ProfessionalJobAppliedComponent} from './professional-job-applied/professional-job-applied.component';
import {JobApplicantsComponent} from './job-applicants/job-applicants.component';
import {SingleApplicationJobComponent} from './single-application-job/single-application-job.component';
import {JobApprovalComponent} from './admin/job-approval/job-approval.component';
import {PendingDirectoriesComponent} from './admin/pending-directories/pending-directories.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {ActiveUsersComponent} from "./admin/active-users/active-users.component";
import {DeactivatedUsersComponent} from "./admin/deactivated-users/deactivated-users.component";
import {AdminControlComponent} from "./admin/admin-control/admin-control.component";

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
        path: 'profile',
        component: MyProfileComponent
      },
      {
        path: 'company',
        component: CompanyProfileComponent,
        canActivate: [CompanyGuard]
      },
      {
        path: 'job',
        component: CompanyJobComponent
      },
      {
        path: 'job/view_applicant/:job_slug',
        component: JobApplicantsComponent
      },
      {
        path: 'job/view_application/:application',
        component: SingleApplicationJobComponent
      },
      {
        path: 'professional',
        component: ProfessionalProfileComponent,
        canActivate: [ProfessionalGuard]
      },
      {
        path: 'my-jobs',
        component: ProfessionalJobAppliedComponent
      },
      {
        path: 'classified',
        component: ClassifiedProductComponent
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
            path: 'requested_directory',
            component: PendingDirectoriesComponent
          },
          {
            path: 'classified_item',
            component: ClassifiedItemComponent
          },
          {
            path: 'job_category',
            component: JobCategoryComponent
          },
          {
            path: 'job_category/child/:parent',
            component: JobCategoryComponent
          },
          {
            path: 'all_job',
            component: JobApprovalComponent
          },
          {
            path: 'active_users',
            component: ActiveUsersComponent
          },
          {
            path: 'deactivated_users',
            component: DeactivatedUsersComponent
          },
          {
            path: 'admin_control',
            component: AdminControlComponent
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
