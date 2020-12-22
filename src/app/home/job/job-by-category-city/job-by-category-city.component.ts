import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-by-category-city',
  templateUrl: './job-by-category-city.component.html',
  styleUrls: ['./job-by-category-city.component.css']
})
export class JobByCategoryCityComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;
  citySlug = '';
  categorySlug = '';

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  parentCategories = [];

  jobs: any = [];
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
        const city_slug = d.get('city_slug');
        if (cat_slug && city_slug){
          // tslint:disable-next-line:triple-equals
          if (this.citySlug == city_slug && this.categorySlug == cat_slug){
          }else {
            this.currentPageNumber = 1;
            this.citySlug = city_slug;
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

    if (this.citySlug && this.categorySlug){
      const url = '/job/get_job/category/' + this.categorySlug + '/city/' + this.citySlug;
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
    this.router.navigateByUrl('/job/category/' + slug + '/city/' + this.citySlug);
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
