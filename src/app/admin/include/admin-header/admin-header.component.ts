import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService) { }

  profile = {
    created_at: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    phone: "",
  }

  ngOnInit(): void {
    if(this.auth._getUser_()){
      this.profile = this.auth._getUser_();
    }
  }

  toggle(content): void{
    content.classList.toggle("active");
  }




  logout(): void{
    this.api.post('/user/logout', {}).subscribe(
      (res)=> {
        this.auth.logout()
      }
    )
  }

}
