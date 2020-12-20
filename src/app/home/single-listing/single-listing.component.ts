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

  post = {
    state: {
      name: ''
    },
    city: {
      name: ''
    },
    brand: {
      name: ''
    },
    address: '',
    description: '',
    name: '',
    category: [],
    condition: '',
    age: 0,
    price: '',
    price_type: '',
    user: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
    },
    created_at: ''
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => {
      this.postSlug = d.get('post_slug');
    })
    this.isLoggedIn = this.auth.isLoggedIn;
    this.fetchPost();
  }

  fetchPost(): void{
    if(this.postSlug){
      this.api.post('/classified_product/get_post/' + this.postSlug, {}).subscribe(
        res => {
          this.post = res.data;
          console.log(res.data)
        },
        err => {}
      )
    }
    
  }


}
