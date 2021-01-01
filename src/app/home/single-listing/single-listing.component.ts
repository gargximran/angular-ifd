import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-single-listing',
  templateUrl: './single-listing.component.html',
  styleUrls: ['./single-listing.component.css']
})
export class SingleListingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private api: ApiService) { }
  postSlug = '';
  isLoggedIn = false;
  today = new Date().toISOString();
  post: any = {};
  relatedClassifieds: Array<any>;

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      this.postSlug = d.get('post_slug');
    });
    this.isLoggedIn = this.auth.isLoggedIn;
    this.fetchPost();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.paramMap.subscribe(d => {
      const slug = d.get('post_slug');
      // tslint:disable-next-line:triple-equals
      if (slug == this.postSlug) {
        this.fetchPost();
        this.postSlug = '';
      }
    });
  }

  fetchPost(): void{
    window.scroll(0, 0);
    if (this.postSlug){
      this.api.post('/classified_product/get_post/' + this.postSlug, {}).subscribe(
        res => {
          this.post = res.data.post;
          this.relatedClassifieds = res.data.related_post;
        },
        () => {}
      );
    }

  }


}
