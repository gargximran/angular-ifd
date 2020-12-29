import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-professional-job-applied',
  templateUrl: './professional-job-applied.component.html',
  styleUrls: ['./professional-job-applied.component.css']
})
export class ProfessionalJobAppliedComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private api: ApiService,
  ) {}

  currentPageNumber = 1;
  itemPerPage = 10;

  jobs: any = [];

  ngOnInit(): void {
    this.fetchData();
  }


  fetchData(): any {
    this.api.post('/job/get_jobs_by_professional', {}).subscribe(
      (res) => {
        this.jobs = res.data.job;
      },
      (err) => {}
    );
  }


  pageChange(event): any {
    this.currentPageNumber = event;
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
  }

}
