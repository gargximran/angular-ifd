import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { ToastrService } from 'ngx-toastr';
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
    private api: ApiService,
    private toastr: ToastrService,
    private ModalService: NgbModal
  ) {}

  @ViewChild('deleteSwal') deleteSwal;
  @ViewChild('deleteSuccess') deleteSuccess;
  @ViewChild('deleteJob') deleteJobSwal;


  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;


  loading = false;



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
    marital_status: new FormControl(''),
    alternate_phone: new FormControl(''),
    alternate_email: new FormControl(''),
    career_summary: new FormControl('')
  });

  dataSelector: NgbDateStruct;

  ProfessionalDetail = {
    mother: '',
    name: '',
    father: '',
    category: [],
    description: '',
    image: 'assets/images/dumylogo.png',
    city: {id: '', name: ''},
    state: {id: '', name: ''},
    address: '',
    gender: '',
    birthday: '',
    religion: '',
    nationality: '',
    marital_status: '',
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

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void {
    if (this.auth.ProfessionalProfile) {
        this.ProfessionalDetail = {...this.auth.ProfessionalProfile, image: this.auth.ProfessionalProfile.image || 'assets/images/dumylogo.png'};
        this.formData.patchValue({
          father: this.ProfessionalDetail.father,
          mother: this.ProfessionalDetail.mother,
          category: this.ProfessionalDetail.category.map(value => value.id),
          description: this.ProfessionalDetail.description || '',
          image: this.ProfessionalDetail.image,
          city: this.ProfessionalDetail.city.id,
          state: this.ProfessionalDetail.state.id,
          address: this.ProfessionalDetail.address || '',
          gender: this.ProfessionalDetail.gender,
          birthday: this.ProfessionalDetail.birthday,
          religion: this.ProfessionalDetail.religion || '',
          nationality: this.ProfessionalDetail.nationality || '',
          marital_status: this.ProfessionalDetail.marital_status || '',
          alternate_phone: this.ProfessionalDetail.alternate_phone || '',
          alternate_email: this.ProfessionalDetail.alternate_email || '',
          career_summary: this.ProfessionalDetail.career_summary || ''
        });
    } else {
      this.ProfessionalDetail = {
        mother: '',
        name: '',
        father: '',
        category: [],
        description: '',
        image: 'assets/images/dumylogo.png',
        city: {id: '', name: ''},
        state: {id: '', name: ''},
        address: '',
        gender: '',
        birthday: '',
        religion: '',
        nationality: '',
        marital_status: '',
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
    this.loading = true;
    const supperThis = this;
    let url = '';
    if (this.auth.ProfessionalProfile) {
      url = '/professional_profile/update';
    } else {
      url = '/professional_profile/create';
    }

    function getBirthday(): any{
      let result = '';
      const bday = supperThis.formData.get('birthday').value;
      // tslint:disable-next-line:triple-equals
      if (typeof bday == 'object'){
        // tslint:disable-next-line:triple-equals
        result = `${bday.year}-${bday.month.length == 2 ? bday.month : '0' + bday.month}-${bday.day}`;
        // tslint:disable-next-line:triple-equals
      } else if (typeof bday == 'string'){
        result = bday;
      }
      return result;
    }

    const form = new FormData();
    form.append('father', this.formData.get('father').value || '');
    form.append('description', this.formData.get('description').value || '');
    form.append('mother', this.formData.get('mother').value || '');
    form.append('gender', this.formData.get('gender').value || '');
    form.append('birthday', getBirthday());
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
        this.loading = false;
        this.editMode = true;
        this.ngOnInit();
        this.ngAfterContentInit();
        this.toastr.success('Change done!');
      },
      (err) => {
        this.loading = false;
        this.toastr.error('Please check data again!');
        this.formData.setErrors({
          ...err.errors
        });
      }
    );
  }

  openDeleteSwal(): void {
    if (this.auth.ProfessionalProfile) {
      this.deleteSwal.fire();
    }
  }

  deleteProfile(): void {
    this.api.post('/professional_profile/delete', {}).subscribe(
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
