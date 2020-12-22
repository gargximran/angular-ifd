import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {ApiService} from '../../../service/api.service';

@Component({
  selector: 'app-job-single',
  templateUrl: './job-single.component.html',
  styleUrls: ['./job-single.component.css']
})
export class JobSingleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private api: ApiService) { }
  postSlug = '';
  isLoggedIn = false;
  today = new Date().toISOString();
  job: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      this.postSlug = d.get('post_slug');
    });
    this.isLoggedIn = this.auth.isLoggedIn;
    this.fetchPost();
  }

  fetchPost(): void{
    if (this.postSlug){
      this.api.post('/job/get_job/' + this.postSlug, {}).subscribe(
        res => {
          this.job = res.data;
        },
        () => {}
      );
    }

  }

}
