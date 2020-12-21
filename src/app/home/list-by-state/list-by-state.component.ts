import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list-by-state',
  templateUrl: './list-by-state.component.html',
  styleUrls: ['./list-by-state.component.css']
})
export class ListByStateComponent implements OnInit {

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
  cities = [];
  currentState = {
    name: ''
  };


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {    
    this.fetchData();
    this.fetchCategories();

    
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
      let url = '/classified_product/get_products/state/'+ this.params;
      this.api.post(url, form).subscribe(
        (res) => {
          this.totalVolume = res.data.count;
          this.products = res.data.collections;
          this.cities = res.data.cities;
          this.currentState = res.data.state;
          
        },
        (err) => {}
      );
    }
 
    
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
