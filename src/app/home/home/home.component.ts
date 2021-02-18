import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;

  searchText: string;

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  products = [];
  parentCategories = [];
  states = [];

  stateDisplayCollapse = true;

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
    form.append('status', 'active');

    let url = '/classified_product/get_products';

    this.route.queryParamMap.subscribe(d => {
      if (d.get('search')){
        form.append('search', d.get('search'));
        url = '/classified_product/search';
      }
    });

    this.api.post(url, form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.products = res.data.collections;
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
    const url = '/classified_category/get_all_parent';

    this.api.post(url, form).subscribe(
      (res) => {
        this.parentCategories = res.data;
      },
      () => {}
    );
  }

  search(value): void{
    if (value.value){
      this.router.navigate(['/'], {
        queryParams: {
          search: value.value
        }
      });
    } else {
      this.router.navigate(['/']);
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
