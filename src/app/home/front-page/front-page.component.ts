import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  selectedOption: any = 'directory';

  emailSubmitForm = new FormGroup({
    email: new FormControl('')
  });

  mostPopularDirectories: Array<any> = [];
  recentClassifieds: Array<any> = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchMostPopularDirectories();
    this.fetchRecentClassifieds();
  }

  goToSearchPage(value): void{
    this.router.navigate(['/' + this.selectedOption], {
      queryParams: {
        search: value.value
      }
    });
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
