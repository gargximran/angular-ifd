import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-by-city',
  templateUrl: './job-by-city.component.html',
  styleUrls: ['./job-by-city.component.css']
})
export class JobByCityComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;
  params = '';

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;

  jobs: Array<any> = [];
  parentCategories: any = [];
  cities: any = [];
  currentState: any = {
    name: ''
  };


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCategories();
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.paramMap.subscribe(
      d => {
        const slug = d.get('slug');
        if (slug){
          // tslint:disable-next-line:triple-equals
          if (this.params == slug){
          }else {
            this.currentPageNumber = 1;
            this.params = slug;
            this.ngOnInit();
          }
        }
      }
    );
  }

  fetchData(): any {
    window.scroll(0, 0);
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    if (this.params){
      const url = '/job/get_jobs/city/' + this.params;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.jobs = res.data.collections;
          this.cities = res.data.cities;
          this.currentState = res.data.state;
        },
        () => {}
      );
    }
  }


  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchData();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchData();
  }

  fetchCategories(): any {
    const form = new FormData();
    const url = '/job_category/get_all_parent';

    this.api.post(url, form).subscribe(
      (res) => {
        this.parentCategories = res.data;
      },
      () => {}
    );
  }

  search(value): void{
    if (value.value){
      this.router.navigate(['/job'], {
        queryParams: {
          search: value.value
        }
      });
    }
  }

}
