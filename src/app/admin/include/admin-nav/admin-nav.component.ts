import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isAdmin()){
      this.isAdmin = true
    }
  }

  isAdmin = false


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
