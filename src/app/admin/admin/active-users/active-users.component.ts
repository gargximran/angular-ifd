import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {ApiService} from "../../../service/api.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) {}


  @ViewChild('activateUser') activateUser;
  @ViewChild('DeactivateSwal') DeactivateSwal;
  @ViewChild('activateSuccess') activateSuccess;
  @ViewChild('deactivateSuccess') deactivateSuccess;
  @ViewChild('deleteSuccess') deleteSuccess;
  @ViewChild('FailedSwal') FailedSwal;
  @ViewChild('deleteUser') deleteUser;

  forDelete = '';
  forActivate = '';
  forDeactivate = '';


  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;
  type = 'all';

  users: any = [];

  ngOnInit(): void {
    this.fetchData();

  }

  deleteSwalOpen(data): void{
    this.forDelete = '';
    this.deleteUser.fire();
    this.forDelete = data;
  }

  deleteConfirm(): void{
    this.api.post('/user/delete/' + this.forDelete, {}).subscribe(
      res => {
        this.forDelete = '';
        this.deleteSuccess.fire();
        this.fetchData();
      },
      err => {
        this.forDelete = '';
        this.FailedSwal.fire()
        this.fetchData();
      }
    );

  }

  openActivateSwal(id): void{
    this.forActivate = id;
    this.activateUser.fire();
  }

  openDeactivateSwal(id): void{
    this.forDeactivate = id;
    this.DeactivateSwal.fire();
  }

  activateThisUser(): void{
    this.api.post('/user/activate/' + this.forActivate, {}).subscribe(
      res => {
        this.fetchData();
        this.forActivate = '';
        this.activateSuccess.fire();
      },
      () => {
        this.forActivate = '';
        this.FailedSwal.fire();
      }
    );
  }

  deactivateThisUser(): void{
    this.api.post('/user/deactivate/' + this.forDeactivate, {}).subscribe(
      res => {
        this.fetchData();
        this.forDeactivate = '';
        this.deactivateSuccess.fire();
      },
      () => {
        this.forDeactivate = '';
        this.FailedSwal.fire();
      }
    );
  }


  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));
    form.append('status', 'active');
    form.append('user_type', this.type);

    this.api.post('/user/all_users', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.users = res.data.collections;
      },
      () => {}
    );
  }

  ChangePostStatus(v): void{
    this.type = v.target.value;
    this.fetchData();
  }


  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchData();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchData();
  }

}
