import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Select2Data} from 'ng-select2-component';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.css']
})
export class JobApplicantsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  loading = false;


  currentPageNumber = 1;
  itemPerPage = 10;

  stateDataForFormSelector: Select2Data = [];


  applications: Array<any>;



  ngOnInit(): void {
    this.fetchApplicant();
  }

  fetchApplicant(): any {
    // tslint:disable-next-line:variable-name
    let job_slug = '';
    this.route.paramMap.subscribe(d => {
      job_slug = d.get('job_slug');
    });
    if (job_slug){
      this.api.post('/job/get_applications/' + job_slug, {}).subscribe(
        (res) => {
          this.applications = res.data.applications;
        },
        (err) => {}
      );
    }
  }

  pageChange(event): any {
    this.currentPageNumber = event;
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
  }


}
