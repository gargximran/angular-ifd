import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {ApiService} from "../../../service/api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {url} from "../../../env";
import {Response} from "../../../models/api_response";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit {


  registrationType = 'professional';
  loading = false;

  registrationForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl('')
  });

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private modalService: NgbModal,
    private http: HttpClient,
    private toastr: ToastrService,
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

  openVerticallyCentered(content): void{
    this.modalService.open(content, { centered: true });
  }


  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    this.api.post('/user/all_admins', form).subscribe(
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

  registration(): void{
    this.loading = true;
    const form = new FormData();
    form.append('first_name', this.registrationForm.get('first_name').value || '');
    form.append('last_name', this.registrationForm.get('last_name').value || '');
    form.append('email', this.registrationForm.get('email').value || '');
    form.append('phone', this.registrationForm.get('phone').value || '');
    form.append('password', this.registrationForm.get('password').value || '');
    form.append('username', this.registrationForm.get('username').value || '');
    form.append('type', this.registrationType);

    this.api.post('/user/add_admin', form).subscribe(
      res => {
        this.loading = false;
        this.toastr.success(res.message);
        this.modalService.dismissAll();
        this.fetchData();
      },
      err => {
        this.loading = false;
        this.toastr.error(err.message);
        this.registrationForm.setErrors({
          ...err.errors
        });
      }
    );




  }

}
