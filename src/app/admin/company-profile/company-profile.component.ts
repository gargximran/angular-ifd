import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Select2Data } from 'ng-select2-component';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FileHolder} from 'angular2-image-upload';

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

  listingStatus = 3;

  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;


  loading = false;

  requestForm = new FormGroup({
    image: new FormControl(''),
    category: new FormControl('')
  });

  editMode = true;
  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];
  categoryDataForFormSelector: Select2Data = [];

  formData = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    address: new FormControl(''),
  });

  directorySlug = '';

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
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void {
    if (this.auth.CompanyProfile) {
      this.checkListedStatus();
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
      () => {}
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
        () => {}
      );
    }
  }

  initAllCategory(): any {
    this.api.get('/directory_category/get_categories').subscribe(
      (res) => {
        const datas = [];

        res.data.forEach((element) => {
          const data = { label: element.name.toUpperCase(), value: element.id };
          datas.push(data);
        });
        this.categoryDataForFormSelector = [
          {
            label: 'Select Parent',
            options: datas,
            classes: 'company-profile-category d-inline-block'
          },
        ];
      },
      () => {}
    );
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
    this.loading = false;

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
      url = '/user/update-company-profile';
    } else {
      url = '/user/create-company-profile';
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
        this.loading = false;
        this.editMode = true;
        this.ngOnInit();
        this.ngAfterContentInit();
        this.toastr.success('Change done!');
      },
      (err) => {
        this.loading = false;
        this.toastr.error('Please check data again!');
        this.submitErrors = { ...this.submitErrors, ...err.errors };
      }
    );
  }

  requestFormSubmit(): void{
    this.loading = true;
    const form = new FormData();
    form.append('category', String(this.requestForm.get('category').value || ''));
    form.append('image', this.requestForm.get('image').value || '');
    this.api.post('/directory_item/get_listed_by_company', form).subscribe(
      res => {
        this.loading = false;
        this.toastr.success('Request submitted!');
        this.ModalService.dismissAll();
        this.listingStatus = 1;
      },
      err => {
        this.loading = false;
        this.requestForm.setErrors({
          ...err.errors
        });
        this.toastr.error(err.message);
      }
    );
  }

  checkListedStatus(): void{
    this.api.post('/directory_item/check_company_request_status', {}).subscribe(
      res => {
        if (res.data){
          this.directorySlug = res.data.slug;
        }
        // tslint:disable-next-line:radix
        this.listingStatus = parseInt(res.message);
      },
      () => {}
    );
  }

  addImage(e: FileHolder): void{
    this.requestForm.patchValue({
      image: e.file
    });
  }

  removeImage(e: FileHolder): void{
    this.requestForm.patchValue({
        image: ''
      });
  }

  open(content): void {
    this.initAllCategory();
    this.ModalService.open(content, {
      centered: true,
      size: 'md'
    });
  }




}
