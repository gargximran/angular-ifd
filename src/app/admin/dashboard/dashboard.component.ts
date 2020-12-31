import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService) { }

  TypeOfUser = '';
  dashboardData: any;

  ngOnInit(): void {
    if (this.auth.isAdmin()){
      this.api.post('/user/admin-dashboard', {}).subscribe(
        res => {
          this.TypeOfUser = 'admin';
          this.dashboardData = res.data;
        }
      );
    }else{
      this.api.post('/user/user-dashboard', {}).subscribe(
        res => {
          this.TypeOfUser = 'user';
          this.dashboardData = res.data;
        }
      );
    }
  }

}
