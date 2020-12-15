import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminNavComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService) { }

  isAdmin = false;
  isCompany = false;
  isProfessional = false;

  ngOnInit(): void {
    if(this.auth.isAdmin()){
      this.isAdmin = true
    }

    if(this.auth.isCompany()){
      this.isCompany = true;
    }

    if(this.auth.isProfessional()){
      this.isProfessional = true;
    }
  }

  


  toggleMobileMenu(menu){
    menu.classList.toggle('active')
  }

  logout(){
    this.api.post('/user/logout', {}).subscribe(
      (res)=> {
        this.auth.logout()
      }
    )
  }

}
