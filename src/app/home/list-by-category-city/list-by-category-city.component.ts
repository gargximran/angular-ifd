import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
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

  parentCategories = [];

  products = [];
  childCategories = [];
  state = {
    name: ''
  };
  cities = []

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
  }

  constructor(private api: ApiService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {    
    this.fetchData();
    this.fetchCategories();    
  }
  

  ngDoCheck(): void {
    this.route.paramMap.subscribe(
      d => {
        let cat_slug = d.get('cat_slug');
        let city_slug = d.get('city_slug');     
        if (cat_slug && city_slug){          
          if (this.citySlug == city_slug && this.categorySlug == cat_slug){
          }else {
            this.currentPageNumber = 1;
            this.citySlug = city_slug;
            this.categorySlug = cat_slug;
            this.ngOnInit();
          }
        }
      }
    )
  }

  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    if (this.citySlug && this.categorySlug){
      let url = '/classified_product/get_products/category/'+ this.categorySlug + '/city/' + this.citySlug;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.products = res.data.collections;
          this.childCategories = res.data.child_category;
          this.cities = res.data.cities;
          this.state = res.data.state;
        },
        (err) => {}
      );
    }
 
    
  }

  change_route(slug): void{    
    this.router.navigateByUrl('/category/'+ slug + '/city/' + this.citySlug);
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
    let url = '/classified_category/get_all_parent';   

    this.api.post(url, {}).subscribe(
      (res) => {
        this.parentCategories = res.data
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
      })
    }
  }

}