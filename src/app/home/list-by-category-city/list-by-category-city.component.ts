import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list-by-category-city',
  templateUrl: './list-by-category-city.component.html',
  styleUrls: ['./list-by-category-city.component.css']
})
export class ListByCategoryCityComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;
  citySlug = '';
  categorySlug = '';

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  parentCategories: any = [];
  currentCategory: any = {};

  products: any = [];
  childCategories: any = [];
  state: any = {
    name: ''
  };
  cities: any = [];

  stateDisplayCollapse = true;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.fetchData();
    this.fetchCategories();
  }

  displayState(): any {
    return this.stateDisplayCollapse ?
      (this.cities.length > 6 ? this.cities.slice(0, 6) : this.cities ) :
      this.cities;
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
      const url = '/classified_product/get_products/category/' + this.categorySlug + '/city/' + this.citySlug;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.products = res.data.collections;
          this.childCategories = res.data.child_category;
          this.cities = res.data.cities;
          this.state = res.data.state;
          this.currentCategory = res.data.category;
        },
        (err) => {}
      );
    }


  }

  change_route(slug): void{
    this.router.navigateByUrl('/category/' + slug + '/city/' + this.citySlug);
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
    const url = '/classified_category/get_all_parent';

    this.api.post(url, {}).subscribe(
      (res) => {
        this.parentCategories = res.data;
      },
      (err) => {}
    );

  }

  search(value): void{
    if (value.value){
      this.router.navigate(['/'], {
        queryParams: {
          search: value.value
        }
      });
    }
  }

}
