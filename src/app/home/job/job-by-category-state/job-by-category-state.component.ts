import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-by-category-state',
  templateUrl: './job-by-category-state.component.html',
  styleUrls: ['./job-by-category-state.component.css']
})
export class JobByCategoryStateComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;
  stateSlug = '';
  categorySlug = '';

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  parentCategories = [];

  jobs = [
    {
      category: [],
      company: {
        name: '',
        logo: '',
        address: '',
        url: ''
      },
      user: {
        email: '',
        phone: ''
      },
      city: {
        name: ''
      },
      state: {
        name: ''
      },
      title: '',
      slug: '',
      description: ''
    }
  ];
  childCategories: any = [];
  state: any = {
    name: ''
  };
  cities: any = [];

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
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.paramMap.subscribe(
      d => {
        // tslint:disable-next-line:variable-name
        const cat_slug = d.get('cat_slug');
        // tslint:disable-next-line:variable-name
        const state_slug = d.get('state_slug');
        if (cat_slug && state_slug){
          // tslint:disable-next-line:triple-equals
          if (this.stateSlug == state_slug && this.categorySlug == cat_slug){
          }else {
            this.currentPageNumber = 1;
            this.stateSlug = state_slug;
            this.categorySlug = cat_slug;
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

    if (this.stateSlug && this.categorySlug){
      const url = '/job/get_jobs/category/' + this.categorySlug + '/state/' + this.stateSlug;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.jobs = res.data.collections;
          this.childCategories = res.data.child_category;
          this.cities = res.data.cities;
          this.state = res.data.state;
        },
        () => {}
      );
    }
  }

  change_route(slug): void{
    this.router.navigateByUrl('/job/category/' + slug + '/state/' + this.stateSlug);
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