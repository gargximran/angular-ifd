import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {ApiService} from '../../../service/api.service';

@Component({
  selector: 'app-job-approval',
  templateUrl: './job-approval.component.html',
  styleUrls: ['./job-approval.component.css']
})
export class JobApprovalComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) {}

  @ViewChild('deleteSwal') deleteSwal;
  @ViewChild('deleteSuccess') deleteSuccess;
  @ViewChild('deleteJob') deleteJobSwal;
  @ViewChild('approveSuccess') approveSuccess;
  @ViewChild('approveJob') approveJobSwal;
  @ViewChild('approveFailed') approveFailed;
  @ViewChild('DisapproveJob') DisapproveJobSwal;
  @ViewChild('disapproveSuccess') disapproveSuccess;

  forDelete = '';
  forApprove = '';
  forDisapprove = '';


  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;
  status = 'all';

  jobs: any = [];

  ngOnInit(): void {
    this.fetchData();

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

  openApproveSwal(id): void{
    this.forApprove = id;
    this.approveJobSwal.fire();
  }

  openDisapproveSwal(id): void{
    this.forDisapprove = id;
    this.DisapproveJobSwal.fire();
  }

  approveThisJob(): void{
    this.api.post('/job/approve/' + this.forApprove, {}).subscribe(
      res => {
        this.fetchData();
        this.forApprove = '';
        this.approveSuccess.fire();
      },
      () => {
        this.forApprove = '';
        this.approveFailed.fire();
      }
    );
  }

  disapproveThisJob(): void{
    this.api.post('/job/disapprove/' + this.forDisapprove, {}).subscribe(
      res => {
        this.fetchData();
        this.forDisapprove = '';
        this.disapproveSuccess.fire();
      },
      () => {
        this.forDisapprove = '';
        this.approveFailed.fire();
      }
    );
  }


  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));
    form.append('status', this.status);

    this.api.post('/job/get_jobs_for_admin', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.jobs = res.data.collections;
      },
      () => {}
    );
  }

  ChangePostStatus(v): void{
    this.status = v.target.value;
    this.fetchData();
  }


  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchData();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchData();
  }


}
