import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-directory-by-category',
  templateUrl: './directory-by-category.component.html',
  styleUrls: ['./directory-by-category.component.css']
})
export class DirectoryByCategoryComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;
  params = '';

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  directories: Array<any> = [];
  parentCategories: Array<any> = [];
  childCategories: Array<any> = [];
  states: Array<any> = [];
  currentCategory: any = {};

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 5
      },
      740: {
        items: 7
      },
      940: {
        items: 8
      }
    },
    nav: true
  };

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchCategories();
    this.initialize_all_states();


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
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    if (this.params){
      const url = '/directory_item/get_items/' + this.params;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.directories = res.data.collections;
          this.childCategories = res.data.child_category;
          this.currentCategory = res.data.category;
        },
        () => {}
      );
    }


  }

  change_route(slug): void{
    this.router.navigateByUrl('/directory/category/' + slug);
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
    const url = '/directory_category/get_all_parent';

    this.api.post(url, form).subscribe(
      (res) => {
        this.parentCategories = res.data;
      },
      () => {}
    );
  }

  search(value): void{
    if (value.value){
      this.router.navigate(['/directory'], {
        queryParams: {
          search: value.value
        }
      });
    }
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
