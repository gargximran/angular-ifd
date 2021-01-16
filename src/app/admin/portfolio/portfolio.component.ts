import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {ApiService} from "../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {FileHolder} from "angular2-image-upload";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

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

  existingImageUrl: string;
  uploadedUpdateImage: string;

  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;
  status = 'all';

  jobs: any = [];

  loading = false;

  jobPostForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    image: new FormControl()
  });


  ngOnInit(): void {
    this.company = !!this.auth.CompanyProfile || !!this.auth.ProfessionalProfile;
    this.fetchData();

  }

  deleteJobSwalOpen(data): void{
    this.forDelete = '';
    this.deleteJobSwal.fire();
    this.forDelete = data;
  }

  deleteJobConfirm(): void{
    this.api.post('/portfolio/delete/' + this.forDelete, {}).subscribe(
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
    this.uploadedUpdateImage = '';
    this.existingImageUrl = '';
    this.jobPostForm.reset();
    this.open_modal(value);
  }

  submitJobForm(): void{
    this.loading = true;
    let url = '';
    if (this.jobPostForm.get('id').value){
      url = '/portfolio/update/' + this.jobPostForm.get('id').value;
    }else{
      url = '/portfolio/create';
    }
    const form = new FormData();
    form.append('title', this.jobPostForm.get('title').value || '');
    form.append('description', this.jobPostForm.get('description').value || '');
    form.append('image', this.jobPostForm.get('image').value || '');
    this.api.post(url, form).subscribe(
      res => {
        if (this.jobPostForm.get('id').value){
          this.toastr.success('Portfolio updated!')
          url = '';
        }else{
          this.toastr.success('Portfolio added!');
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

  addImage(e: FileHolder): void{
    this.jobPostForm.patchValue({
      image: e.file
    })
    if (this.jobPostForm.get('id').value){
      this.uploadedUpdateImage = 'has'
    }
  }
  removeImage(e: FileHolder): void{
    this.jobPostForm.patchValue({
      image: ''
    })

    if (this.jobPostForm.get('id').value){
      this.uploadedUpdateImage = ''
    }
  }


  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    this.api.post('/portfolio/get_portfolios', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.jobs = res.data.collections;
      },
      () => {}
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
    this.uploadedUpdateImage = '';
    this.existingImageUrl = '';
    this.jobPostForm.reset();
    this.jobPostForm.patchValue({
      id: data.id,
      title: data.title,
      description: data.description
    });

    if (data.image){
      this.existingImageUrl = data.image
    }
    this.open_modal(content);
  }


  open_modal(value): void{
    this.ModalService.open(value, {
      centered: true,
      size: 'xl'
    });
  }

}
