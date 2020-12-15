import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { ToastrService } from 'ngx-toastr';
import { last } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.component.html',
  styleUrls: ['./professional-profile.component.css']
})
export class ProfessionalProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private api:ApiService,
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
    category: new FormControl()
  });

  editMode = true;
  categoryDataForFormSelector: Select2Data = [];
  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];
  genderDataForFormSelector: Select2Data = [
    {
      label: 'Select Gender',
      options: [
        {
          label: 'Male',
          value: 'male',
          classes: 'company-profile-category'
        },
        {
          label: 'Female',
          value: 'female',
          classes: 'company-profile-category'
        },
        {
          label: 'Other',
          value: 'other',
          classes: 'company-profile-category'
        }
      ]
    }
  ];


  religionDataForFormSelector: Select2Data = [
    {
      label: 'Select Gender',
      options: [
        {
          label: 'African Traditional & Diasporic',
          value: 'african traditional & diasporic',
          classes: 'company-profile-category'
        },
        {
          label: 'Agnostic',
          value: 'agnostic',
          classes: 'company-profile-category'
        },
        {
          label: 'Atheist',
          value: 'atheist',
          classes: 'company-profile-category'
        },
        {
          label: 'Buddhism',
          value: 'Buddhism',
          classes: 'company-profile-category'
        },
        {
          label: 'Cao Dai',
          value: 'Cao Dai',
          classes: 'company-profile-category'
        },
        {
          label: 'Chinese traditional religion',
          value: 'Chinese traditional religion',
          classes: 'company-profile-category'
        },
        {
          label: 'Christianity',
          value: 'Christianity',
          classes: 'company-profile-category'
        },
        {
          label: 'Hinduism',
          value: 'Hinduism',
          classes: 'company-profile-category'
        },
        {
          label: 'Islam',
          value: 'Islam',
          classes: 'company-profile-category'
        },
        {
          label: 'Jainism',
          value: 'Jainism',
          classes: 'company-profile-category'
        },
        {
          label: 'Juche',
          value: 'Juche',
          classes: 'company-profile-category'
        },
        {
          label: 'Judaism',
          value: 'Judaism',
          classes: 'company-profile-category'
        },
        {
          label: 'Neo-Paganism',
          value: 'Neo-Paganism',
          classes: 'company-profile-category'
        },
        {
          label: 'Non-religious',
          value: 'Non-religious',
          classes: 'company-profile-category'
        },
        {
          label: 'Rastafarianism',
          value: 'Rastafarianism',
          classes: 'company-profile-category'
        },
        {
          label: 'Secular',
          value: 'Secular',
          classes: 'company-profile-category'
        },
        {
          label: 'Shinto',
          value: 'Shinto',
          classes: 'company-profile-category'
        },
        {
          label: 'Sikhism',
          value: 'Sikhism',
          classes: 'company-profile-category'
        },
        {
          label: 'Spiritism',
          value: 'Spiritism',
          classes: 'company-profile-category'
        },
        {
          label: 'Tenrikyo',
          value: 'Tenrikyo',
          classes: 'company-profile-category'
        },
        {
          label: 'Unitarian-Universalism',
          value: 'Unitarian-Universalism',
          classes: 'company-profile-category'
        },
        {
          label: 'Zoroastrianism',
          value: 'Zoroastrianism',
          classes: 'company-profile-category'
        },
        {
          label: 'Primal-indigenous',
          value: 'Primal-indigenous',
          classes: 'company-profile-category'
        },
        {
          label: 'Other',
          value: 'Other',
          classes: 'company-profile-category'
        }
      ]
    }
  ];

  maritialStatusDataForFormSelector: Select2Data = [
    {
      label: 'Select Gender',
      options: [
        {
          label: 'Married',
          value: 'married',
          classes: 'company-profile-category'
        },
        {
          label: 'Unmarried',
          value: 'unmarried',
          classes: 'company-profile-category'
        },
        {
          label: 'Divorced',
          value: 'divorced',
          classes: 'company-profile-category'
        }       
        
      ]
    }
  ];

  formData = new FormGroup({
    father: new FormControl(''),
    mother: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    religion: new FormControl(''),
    nationality: new FormControl(''),
    maritial_status: new FormControl(''),
    alternate_phone: new FormControl(''),
    alternate_email: new FormControl(''),
    career_summary: new FormControl('')
  });

  dataSelector: NgbDateStruct;

  ProfessionalDetail = {
    name: '',
    father: '',
    category: [],
    description: '',
    image: 'assets/images/dumylogo.png',
    city: {},
    state: {},
    address: '',
    gender: '',
    birthday: '',
    religion: '',
    nationality: '',
    meritial_status: '',
    alternate_phone: '',
    alternate_email: '',
    career_summary: '',
    user: {}
  };


  ngOnInit(): void {    
    this.initAllCategory();
    this.initialize_all_states();
    // this.fetchData();
  }

  ngAfterContentInit(): void {
    if (this.auth.ProfessionalProfile) {
        this.ProfessionalDetail = {...this.ProfessionalDetail,...this.auth.ProfessionalProfile, image: this.auth.CompanyProfile.image || 'assets/images/dumylogo.png'};
    } else {
      this.ProfessionalDetail = {
        name: '',
        father: '',
        category: [],
        description: '',
        image: 'assets/images/dumylogo.png',
        city: {},
        state: {},
        address: '',
        gender: '',
        birthday: '',
        religion: '',
        nationality: '',
        meritial_status: '',
        alternate_phone: '',
        alternate_email: '',
        career_summary: '',
        user: {}
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
            label: 'Select Field\'s',
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
        image: $event.target.files[0],
      });
      const reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onloadend = () => {
        this.ProfessionalDetail.image = String(reader.result);
      };
    } else {
      this.formData.patchValue({
        image: '',
      });
      if (this.auth.ProfessionalProfile.image) {
        this.ProfessionalDetail.image = this.auth.ProfessionalProfile.image;
      } else {
        this.ProfessionalDetail.image = 'assets/images/dumylogo.png';
      }
    }
  }

  submitData(): void {
    let url = '';
    if (this.auth.ProfessionalProfile) {
      url = '/professional_profile/update';
    } else {
      url = '/professional_profile/create';
    }

    const form = new FormData();
    form.append('father', this.formData.get('father').value || '');
    form.append('description', this.formData.get('description').value || '');
    form.append('mother', this.formData.get('mother').value || '');
    form.append('gender', this.formData.get('gender').value || '');
    form.append('birthday', this.formData.get('birthday').value || '');
    form.append('religion', this.formData.get('religion').value || '');
    form.append('nationality', this.formData.get('nationality').value || '');
    form.append('marital_status', this.formData.get('marital_status').value || '');
    form.append('alternate_phone', this.formData.get('alternate_phone').value || '');
    form.append('alternate_email', this.formData.get('alternate_email').value || '');
    form.append('alternate_email', this.formData.get('alternate_email').value || '');
    form.append('address', this.formData.get('address').value || '');
    form.append('city', this.formData.get('city').value || '');
    form.append('state', this.formData.get('state').value || '');
    form.append('category', String(this.formData.get('category').value) || '');
    form.append('image', this.formData.get('image').value || '');
    form.append('career_summary', this.formData.get('career_summary').value || '');

    this.api.post(url, form).subscribe(
      (res) => {
        this.editMode = true;
        this.ngOnInit();
        this.ngAfterContentInit();
        this.toastr.success('Change done!');
      },
      (err) => {
        this.toastr.error('Please check data again!');
        this.formData.setErrors({
          ...err.errors
        });
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


  deleteJobSwalOpen(data): void{
    this.forDelete = '';
    this.deleteJobSwal.fire();
    this.forDelete = data;
  }

  deleteJobConfirm(): void{
    this.api.post('/job/delete/' + this.forDelete, {}).subscribe(
      res => {
        this.forDelete = '';
        this.deleteSuccess.fire();
        this.fetchData();
      },
      err => {
        this.forDelete = '';
        this.fetchData();
      }
    )
    
  }

  create_new_job_modal(value): void{
    this.jobPostForm.reset();
    this.open_modal(value);    
  }


  submitJobForm(): void{
    this.loading = true;
    let url = ''
    if (this.jobPostForm.get('id').value){
      url = '/job/update/' + this.jobPostForm.get('id').value
    }else{
      url = '/job/create'
    }
    const form = new FormData();
    form.append('title', this.jobPostForm.get('title').value || '');
    form.append('description', this.jobPostForm.get('description').value || '');
    form.append('category', String(this.jobPostForm.get('category').value) || '');

    this.api.post(url, form).subscribe(
      res => {
        if (this.jobPostForm.get('id').value){
          url = ''
        }else{
          this.toastr.success('New Job Posted!');          
        }
        this.loading = false;        
        this.ModalService.dismissAll()
        this.jobPostForm.reset();
        this.fetchData();
      },
      err => {
        this.toastr.error('Check input data!')
        this.loading = false;
        this.jobPostForm.setErrors({
          ...err.errors
        });
      }
    )

  }


  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    this.api.post('/job/get_jobs', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.jobs = res.data.collections;
      },
      (err) => {}
    );
  }


  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchData();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchData();
  }


  openEditModal(content, data): void{
    this.jobPostForm.reset();
    const categories = data.category.map(value => value.id);
    this.jobPostForm.patchValue({
      id: data.id,
      title: data.title,
      category: categories,
      description: data.description
    });
    this.open_modal(content);
  }

  open_modal(value): void{
    this.ModalService.open(value, {
      centered: true,
      size:'xl'
    })
  }

  con(){
    console.log(this.formData)
  }

}
