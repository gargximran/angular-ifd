import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-listing-by-category',
  templateUrl: './listing-by-category.component.html',
  styleUrls: ['./listing-by-category.component.css']
})
export class ListingByCategoryComponent implements OnInit {

  isCollapsed = false;
  isCollapsedLocation = false;
  params = ''

  // pagination objects
  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 20;
  postStatus = 'active';

  products = [];
  parentCategories = [];
  childCategories = [];
  states = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
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
    nav: false
  }

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {    
    this.fetchData();
    this.fetchCategories();
    this.initialize_all_states();

    
  }
  

  ngDoCheck(): void {
    this.route.paramMap.subscribe(
      d => {
        let slug = d.get('slug')        
        if (slug){          
          if (this.params == slug){
          }else {
            this.currentPageNumber = 1;
            this.params = slug;
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

    if (this.params){
      let url = '/classified_product/get_products/'+ this.params;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.products = res.data.collections;
          this.childCategories = res.data.child_category;
        },
        (err) => {}
      );
    }
 
    
  }

  change_route(slug): void{
    this.router.navigateByUrl('/category/'+slug);
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




  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        this.states = res.data;
      },
      err => {}
    );
  }

}
