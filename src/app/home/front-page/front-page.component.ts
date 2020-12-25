import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  };

  emailSubmitForm = new FormGroup({
    email: new FormControl('')
  });

  mostPopularDirectories: Array<any> = [];
  recentClassifieds: Array<any> = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchMostPopularDirectories();
    this.fetchRecentClassifieds();
  }

  fetchMostPopularDirectories(): void{
    this.api.post('/directory_item/get_most_views', {}).subscribe(
      res => {
        this.mostPopularDirectories = res.data;
      },
      () => {}
    );
  }

  fetchRecentClassifieds(): void{
    const form = new FormData();
    form.append('itemPerPage', '3');
    form.append('pageNumber', '1');
    form.append('status', 'active');
    const url = '/classified_product/get_products';

    this.api.post(url, form).subscribe(
      (res) => {
        this.recentClassifieds = res.data.collections;
      },
      () => {}
    );
  }

}
