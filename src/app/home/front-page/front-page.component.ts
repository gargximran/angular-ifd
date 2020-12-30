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

  featureDirectoryCategories: Array<any> = [];
  featureClassifiedCategories: Array<any> = [];
  featureJobCategories: Array<any> = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchFeaturedDirectoryCategory();
    this.fetchFeaturedClassifiedCategory();
    this.fetchFeaturedJobCategory();
  }

  goToSearchPage(value): void{
    this.router.navigate(['/' + this.selectedOption], {
      queryParams: {
        search: value.value
      }
    });
  }

  fetchFeaturedDirectoryCategory(): void{
    this.api.post('/directory_category/get_all_featured_category', {}).subscribe(
      res => {
        this.featureDirectoryCategories = res.data;
      },
      () => {}
    );
  }

  fetchFeaturedJobCategory(): void{
    this.api.post('/job_category/get_all_featured_category', {}).subscribe(
      res => {
        this.featureJobCategories = res.data;
      },
      () => {}
    );
  }

  fetchFeaturedClassifiedCategory(): void {
    this.api.post('/classified_category/get_all_featured_category', {}).subscribe(
      res => {
        this.featureClassifiedCategories = res.data;
      },
      () => {}
    );
  }
}
