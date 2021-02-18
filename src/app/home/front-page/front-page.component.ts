import { Component, OnInit } from '@angular/core';
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

  collapseFeaturedDirectoryCategories = true;
  collapseFeaturedClassifiedCategories = true;
  collapseFeaturedJobCategories = true;

  featureDirectoryCategories: Array<any> = [];
  featureClassifiedCategories: Array<any> = [];
  featureJobCategories: Array<any> = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
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

  _featureDirectoryCategories(): any {
    return this.collapseFeaturedDirectoryCategories ?
      (
        this.featureDirectoryCategories?.length > 5 ?
          this.featureDirectoryCategories.slice(0, 5):
          this.featureDirectoryCategories
      ):
      this.featureDirectoryCategories
  }

  _featureClassifiedCategories(): any {
    return this.collapseFeaturedClassifiedCategories ?
      (
        this.featureClassifiedCategories?.length > 5 ?
          this.featureClassifiedCategories.slice(0, 5):
          this.featureClassifiedCategories
      ):
      this.featureClassifiedCategories
  }

  _featureJobCategories(): any {
    return this.collapseFeaturedJobCategories ?
      (
        this.featureJobCategories?.length > 5 ?
          this.featureJobCategories.slice(0, 5):
          this.featureJobCategories
      ):
      this.featureJobCategories
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
