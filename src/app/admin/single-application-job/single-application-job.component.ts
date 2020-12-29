import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-application-job',
  templateUrl: './single-application-job.component.html',
  styleUrls: ['./single-application-job.component.css']
})
export class SingleApplicationJobComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  application: any;
  today = new Date().toISOString();

  ngOnInit(): void {
    this.fetchApplication();
  }

  fetchApplication(): void{
    let application = '';
    this.route.paramMap.subscribe(
      d => application = d.get('application')
    );
    if (application){
      this.api.post('/job_application/get_application/' + application, {}).subscribe(
        res => {
          this.application = res.data;
        },
        err => {}
      );
    }
  }

}
