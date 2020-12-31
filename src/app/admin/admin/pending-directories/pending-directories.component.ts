import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pending-directories',
  templateUrl: './pending-directories.component.html',
  styleUrls: ['./pending-directories.component.css']
})
export class PendingDirectoriesComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toastr: ToastrService
  ) {}

  @ViewChild('deleteSwal') deleteSwal;
  @ViewChild('deleteSuccess') deleteSuccess;
  @ViewChild('approveSwal') approveSwal;

  loading = false;




  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;



  directories = [];

  selectedItem: any = {
    id: ''
  };

  ngOnInit(): void {
    this.fetchDirectory();
    this.modalService.dismissAll();
    this.loading = false;
  }

  fetchDirectory(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    this.api.post('/directory_item/get_requested_directories', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.directories = res.data.collections;
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchDirectory();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchDirectory();
  }

  openDeleteAlert(data): void{
    this.selectedItem.id = data.id;
    this.deleteSwal.title = `Delete directory ?`;
    this.deleteSwal.fire();
  }

  deleteCategory(): void {
    this.api
      .post('/directory_item/delete/' + this.selectedItem.id, {})
      .subscribe(
        (res) => {
          this.deleteSuccess.fire();
          this.selectedItem.id = '';
          this.ngOnInit();
        },
        (err) => {
          this.deleteSuccess.fire({
            icon: 'error',
            title: 'Something went wrong!',
          });
          this.selectedItem.id = '';
          this.ngOnInit();
        }
      );
  }

  cancelDelete(): void {
    this.selectedItem.id = '';
  }

  openApproveSwal(id): void{
    this.selectedItem.id = id;
    this.approveSwal.fire();
  }

  approveDirectory(): void{
    if (this.selectedItem.id){
      this.api.post('/directory_item/approve_directory/' + this.selectedItem.id, {}).subscribe(
        (res) => {
          this.toastr.success(res.message);
          this.fetchDirectory();
        },
        () => {
          this.toastr.error('Something went wrong!');
        }
      );
    }

  }



}
