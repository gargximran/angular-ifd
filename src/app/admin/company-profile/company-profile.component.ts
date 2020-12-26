import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Select2Data } from 'ng-select2-component';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private toastr: ToastrService,
    private ModalService: NgbModal
  ) {}

  @ViewChild('deleteSwal') deleteSwal;
  @ViewChild('deleteSuccess') deleteSuccess;
  @ViewChild('deleteJob') deleteJobSwal;

  forDelete = '';

  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;

  jobs: any = [];

  loading = false;

  jobPostForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    category: new FormControl(),
    min_salary: new FormControl(),
    max_salary: new FormControl(),
    job_type: new FormControl(),
    state: new FormControl(),
    city: new FormControl()
  });

  editMode = true;
  categoryDataForFormSelector: Select2Data = [];
  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];

  formData = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    address: new FormControl(''),
  });

  companyDetail = {
    name: '',
    url: '',
    description: '',
    logo: 'assets/images/dumylogo.png',
    city: {},
    state: {},
    address: '',
  };

  submitErrors = {
    name: '',
    url: '',
    description: '',
    logo: '',
    city: '',
    state: '',
    address: '',
  };

  ngOnInit(): void {
    this.initialize_all_states();
    this.initAllCategory();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void {
    if (this.auth.CompanyProfile) {
      this.companyDetail.name = this.auth.CompanyProfile.name;
      this.companyDetail.url = this.auth.CompanyProfile.url || '';
      this.companyDetail.description =
        this.auth.CompanyProfile.description || '';
      this.companyDetail.logo =
        this.auth.CompanyProfile.logo || 'assets/images/dumylogo.png';
      this.companyDetail.city = this.auth.CompanyProfile.city || '';
      this.companyDetail.state = this.auth.CompanyProfile.state || '';
      this.companyDetail.address = this.auth.CompanyProfile.address || '';

      this.formData.patchValue({
        name: this.auth.CompanyProfile.name,
        url: this.auth.CompanyProfile.url || '',
        description: this.auth.CompanyProfile.description || '',
        city: this.auth.CompanyProfile.city.id || '',
        state: this.auth.CompanyProfile.state.id || '',
        address: this.auth.CompanyProfile.address || '',
      });
      this.companyDetail.logo =
        this.auth.CompanyProfile.logo || 'assets/images/dumylogo.png';
    } else {
      this.companyDetail = {
        name: '',
        url: '',
        description: '',
        logo: 'assets/images/dumylogo.png',
        city: {},
        state: {},
        address: '',
      };
      this.formData.reset();
      this.editMode = false;
      this.formData.enable();
    }
  }

  initAllCategory(): any {
    this.api.get('/job_category/get_categories').subscribe(
      (res) => {
        const datas = [];

        res.data.forEach((element) => {
          const data = {
            label: element.name,
            value: element.id,
            classes: 'company-profile-category',
          };
          datas.push(data);
        });
        this.categoryDataForFormSelector = [
          {
            label: 'Select Categories',
            options: datas,
          },
        ];
      },
      (err) => {}
    );
  }

  initialize_all_states(): void {
    this.api.get('/state/view').subscribe(
      (res) => {
        const datas = [];
        res.data.forEach((value) => {
          const data = {
            label: value.name,
            value: value.id,
            classes: 'company-profile-category',
          };
          datas.push(data);
        });
        this.stateDataForFormSelector = [
          {
            label: 'Select State',
            options: datas,
          },
        ];
      },
      (err) => {}
    );
  }

  getCity(e): void {
    this.formData.get('city').reset();
    if (e.value) {
      this.api.get('/state/view/' + e.value + '/cities').subscribe(
        (res) => {
          const datas = [];
          res.data.forEach((element) => {
            const data = {
              label: element.name,
              value: element.id,
              classes: 'company-profile-category',
            };
            datas.push(data);
          });
          this.cityDataForFormSelector = [
            {
              label: 'Select City',
              options: datas,
            },
          ];

          if (this.auth.CompanyProfile) {
            this.formData.patchValue({
              city: this.auth.CompanyProfile.city.id || '',
            });
          }
        },
        (err) => {}
      );
    }
  }

  uploadImage($event): void {
    if ($event.target.files[0]) {
      this.formData.patchValue({
        logo: $event.target.files[0],
      });
      const reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onloadend = () => {
        this.companyDetail.logo = String(reader.result);
      };
    } else {
      this.formData.patchValue({
        logo: '',
      });
      if (this.auth.CompanyProfile.logo) {
        this.companyDetail.logo = this.auth.CompanyProfile.logo;
      } else {
        this.companyDetail.logo = 'assets/images/dumylogo.png';
      }
    }
  }

  submitData(): void {
    this.submitErrors = {
      name: '',
      url: '',
      description: '',
      logo: '',
      city: '',
      state: '',
      address: '',
    };

    let url = '';
    if (this.auth.CompanyProfile) {
      url = '/company_profile/update';
    } else {
      url = '/company_profile/create';
    }

    const form = new FormData();
    form.append('name', this.formData.get('name').value || '');
    form.append('description', this.formData.get('description').value || '');
    form.append('url', this.formData.get('url').value || '');
    form.append('address', this.formData.get('address').value || '');
    form.append('city', this.formData.get('city').value || '');
    form.append('state', this.formData.get('state').value || '');
    form.append('logo', this.formData.get('logo').value || '');

    this.api.post(url, form).subscribe(
      (res) => {
        this.editMode = true;
        this.ngOnInit();
        this.ngAfterContentInit();
        this.toastr.success('Change done!');
      },
      (err) => {
        this.toastr.error('Please check data again!');
        this.submitErrors = { ...this.submitErrors, ...err.errors };
      }
    );
  }

  openDeleteSwal(): void {
    if (this.auth.CompanyProfile) {
      this.deleteSwal.fire();
    }
  }

  deleteProfile(): void {
    this.api.post('/company_profile/delete', {}).subscribe(
      (res) => {
        this.deleteSuccess.fire();
        this.editMode = false;
        this.ngOnInit();
        this.ngAfterContentInit();
      },
      (err) => {
        this.toastr.error('Something went wrong!');
        this.editMode = true;
        this.ngOnInit();
        this.ngAfterContentInit();
      }
    );
  }
}
