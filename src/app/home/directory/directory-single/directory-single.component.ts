import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {ApiService} from '../../../service/api.service';

@Component({
  selector: 'app-directory-single',
  templateUrl: './directory-single.component.html',
  styleUrls: ['./directory-single.component.css']
})
export class DirectorySingleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private api: ApiService, private router: Router) { }
  postSlug = '';
  isLoggedIn = false;
  today = new Date().toISOString();
  post: any;
  relatedPosts: Array<any>;

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
      this.api.post('/directory_item/get_directory/' + this.postSlug, {}).subscribe(
        res => {
          this.post = res.data.post;
          this.relatedPosts = res.data.related_posts;
        },
        (err) => {
          if (err.status_code == 404){
            this.router.navigateByUrl('/error-404');
          }
        }
      );
    }

  }


}
