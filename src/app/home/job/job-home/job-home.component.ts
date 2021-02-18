import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.css']
})
export class JobHomeComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;

  stateDisplayCollapse = true;
  searchText: string;

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;

  jobs: any = [];

  parentCategories: any = [];
  states: any = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.fetchData();
    this.fetchCategories();
    this.initialize_all_states();
  }

  displayState(): any {
    return this.stateDisplayCollapse ?
      (this.states.length > 6 ? this.states.slice(0, 6) : this.states ) :
      this.states;
  }

  fetchData(): any {

    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    let url = '/job/get_items';

    this.route.queryParamMap.subscribe(d => {
      if (d.get('search')){
        form.append('search', d.get('search'));
        url = '/job/search';
      }
    });

    this.api.post(url, form).subscribe(
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
    } else {
      this.router.navigate(['/job']);
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.queryParamMap.subscribe(d => {
      // tslint:disable-next-line:triple-equals
      if (this.searchText != d.get('search')){
        this.searchText = d.get('search');
        this.ngOnInit();
      }
    });
  }


  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        this.states = res.data;
      },
      () => {}
    );
  }

}
