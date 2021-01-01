import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {ApiService} from '../../../service/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { HomeHeaderComponent } from '../../include/header/header.component'

@Component({
  selector: 'app-job-single',
  templateUrl: './job-single.component.html',
  styleUrls: ['./job-single.component.css']
})
export class JobSingleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private api: ApiService, private modal: NgbModal, private toastr: ToastrService, private router: Router) { }
  loading: boolean = false;
  postSlug = '';
  postSlug2 = '';
  isLoggedIn = false;
  today = new Date().toISOString();
  job: any;
  relatedJobs: Array<any>;
  isProfessional: boolean = false;
  applyForm = new FormGroup({
    cover_later: new FormControl(''),
    cv: new FormControl('')
  });
  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      this.postSlug = d.get('post_slug');
    });
    this.isLoggedIn = this.auth.isLoggedIn;
    this.isProfessional = !!this.auth.ProfessionalProfile;
    this.fetchPost();
  }

  fetchPost(): void{
    window.scroll(0, 0);
    if (this.postSlug){
      this.api.post('/job/get_job/' + this.postSlug, {}).subscribe(
        res => {
          this.job = res.data.job;
          this.relatedJobs = res.data.related_job;
        },
        () => {}
      );
    }

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.paramMap.subscribe(d => {
      const slug = d.get('post_slug');
      // tslint:disable-next-line:triple-equals
      if (slug != this.postSlug2) {
        this.postSlug2 = slug;
        this.fetchPost();
      }
    });
  }

  patchCreateFormImageValue(event): void {
    if (event.target.files[0]) {
      this.applyForm.patchValue({
        cv: event.target.files[0],
      });
    } else {
      this.applyForm.patchValue({ cv: '' });
    }
  }

  apply(): void{
    this.loading = true;
    const form = new FormData();
    form.append('cv', this.applyForm.get('cv').value || '');
    form.append('cover_later', this.applyForm.get('cover_later').value || '');
    this.api.post('/job_application/apply/' + this.postSlug, form).subscribe(
      res => {
        this.ngOnInit();
        this.loading = false;
        this.toastr.success('Application Submitted!');
        this.modal.dismissAll();
      },
      () => {
        this.ngOnInit();
        this.loading = false;
        this.toastr.error('Something went wrong!');
        this.modal.dismissAll();
      }
    );
  }

  open(content): void {
    this.modal.open(content, {
      centered: true,
      size: 'xl'
    });
  }



}
