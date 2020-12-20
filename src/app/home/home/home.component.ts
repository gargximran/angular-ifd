import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  products = [];
  parentCategories = [];
  states = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCategories();
    this.initialize_all_states();
  }

  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));
    form.append('status', this.postStatus || 'all');

    this.api.post('/classified_product/get_products', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.products = res.data.collections;
      },
      (err) => {}
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
    let url = '/classified_category/get_all_parent';   

    this.api.post(url, form).subscribe(
      (res) => {
        this.parentCategories = res.data
      },
      (err) => {}
    );
  }


  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        this.states = res.data;
      },
      err => {}
    );
  }

}
