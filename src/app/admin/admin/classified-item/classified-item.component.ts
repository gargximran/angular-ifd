import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Select2Data} from 'ng-select2-component';
import {FormControl, FormGroup} from '@angular/forms';
import {FileHolder} from 'angular2-image-upload';


@Component({
  selector: 'app-classified-item',
  templateUrl: './classified-item.component.html',
  styleUrls: ['./classified-item.component.css']
})
export class ClassifiedItemComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('deleteSwal') deleteSwal;
  @ViewChild('deleteSuccess') deleteSuccess;
  @ViewChild('ApproveSwal') approvalSwal;
  @ViewChild('ApproveSuccess') approveSuccess;

  loading = false;
  parentValue = '';

  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;
  postStatus = 'all';

  conditionSelectorForForm: Select2Data = [
    {
      label: 'Select Condition',
      options: [
        {label: 'New', value: 'new'},
        {label: 'Used', value: 'used'}
      ]
    }
  ];
  priceTypeSelectorForForm: Select2Data = [
    {
      label: 'Select Price Type',
      options: [
        {label: 'Negotiable', value: 'negotiable'},
        {label: 'Fixed', value: 'fixed'}
      ]
    }
  ];


  products = [];

  selectedItem: any = {
    id: ''
  };



  ngOnInit(): void {
    this.fetchData();
    this.loading = false;
  }


  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));
    form.append('status', this.postStatus || 'all');

    this.api.post('/classified_product/get_products', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.products = res.data.collections;
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchData();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchData();
  }

  openDeleteAlert(data): void{
    this.selectedItem.id = data.id;
    this.deleteSwal.title = `Delete Classified Product?`;
    this.deleteSwal.fire();
  }

  ChangePostStatus(event): void{
    this.postStatus = event.target.value;
    this.fetchData();
  }

  deleteCategory(): void {
    this.api
      .post('/classified_product/delete/' + this.selectedItem.id, {})
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

  openApprovalAlert(id): void{
    this.selectedItem.id = id;
    this.approvalSwal.fire();
  }

  approvalPost(): void{
    this.api
      .post('/classified_product/approve/' + this.selectedItem.id, {})
      .subscribe(
        (res) => {
          this.approveSuccess.fire();
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

}
