import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-directory-home',
  templateUrl: './directory-home.component.html',
  styleUrls: ['./directory-home.component.css']
})
export class DirectoryHomeComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;

  searchText: string;

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;

  directories: any = [];
  parentCategories: any = [];
  states: any = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCategories();
    this.initialize_all_states();
  }

  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    let url = '/directory_item/get_directories';

    this.route.queryParamMap.subscribe(d => {
      if (d.get('search')){
        form.append('search', d.get('search'));
        url = '/directory_item/search';
      }
    });

    this.api.post(url, form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.directories = res.data.collections;
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
    let url = '/directory_category/get_all_parent';

    this.api.post(url, form).subscribe(
      (res) => {
        this.parentCategories = res.data;
      },
      (err) => {}
    );
  }

  search(value): void{
    if (value.value){
      this.router.navigate(['/directory'], {
        queryParams: {
          search: value.value
        }
      });
    } else {
      this.router.navigate(['/directory']);
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.queryParamMap.subscribe(d => {
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
      err => {}
    );
  }

}
