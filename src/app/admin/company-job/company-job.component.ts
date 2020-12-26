import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ApiService} from '../../service/api.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {Select2Data} from 'ng-select2-component';

@Component({
  selector: 'app-company-job',
  templateUrl: './company-job.component.html',
  styleUrls: ['./company-job.component.css']
})
export class CompanyJobComponent implements OnInit {

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

  company: boolean = false;

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

  categoryDataForFormSelector: Select2Data = [];
  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];
  jobTypeSelector: Select2Data = [
    {
      label: 'Select One',
      options: [
        {
          label: 'Full Time',
          value: 'full-time'
        },
        {
          label: 'Part Time',
          value: 'part-time'
        },
        {
          label: 'Contractual',
          value: 'contractual'
        }
      ]
    }
  ];



  ngOnInit(): void {
    this.company = !!this.auth.CompanyProfile;
    this.initialize_all_states();
    this.fetchData();
    this.initAllCategory();

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
    this.jobPostForm.get('city').reset();
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
        },
        () => {}
      );
    }
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
    );

  }

  create_new_job_modal(value): void{
    this.jobPostForm.reset();
    this.open_modal(value);
  }

  submitJobForm(): void{
    this.loading = true;
    let url = '';
    if (this.jobPostForm.get('id').value){
      url = '/job/update/' + this.jobPostForm.get('id').value;
    }else{
      url = '/job/create';
    }
    const form = new FormData();
    form.append('title', this.jobPostForm.get('title').value || '');
    form.append('description', this.jobPostForm.get('description').value || '');
    form.append('category', String(this.jobPostForm.get('category').value) || '');
    form.append('city', this.jobPostForm.get('city').value || '');
    form.append('state', this.jobPostForm.get('state').value || '');
    form.append('min_salary', this.jobPostForm.get('min_salary').value || '');
    form.append('max_salary', this.jobPostForm.get('max_salary').value || '');
    form.append('job_type', this.jobPostForm.get('job_type').value || '');

    this.api.post(url, form).subscribe(
      res => {
        if (this.jobPostForm.get('id').value){
          url = '';
        }else{
          this.toastr.success('New Job Posted!');
        }
        this.loading = false;
        this.ModalService.dismissAll();
        this.jobPostForm.reset();
        this.fetchData();
      },
      err => {
        this.toastr.error('Check input data!');
        this.loading = false;
        this.jobPostForm.setErrors({
          ...err.errors
        });
      }
    );

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
      description: data.description,
      min_salary: data.min_salary,
      max_salary: data.max_salary,
      job_type: data.job_type,
      state: data.state.id,
      city: data.city.id
    });
    this.open_modal(content);
  }

  open_modal(value): void{
    this.ModalService.open(value, {
      centered: true,
      size: 'xl'
    });
  }

}
