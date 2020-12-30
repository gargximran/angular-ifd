import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private modelService: NgbModal, private api: ApiService, private toastr: ToastrService) { }

  loading = false;

  brandCreateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    icon: new FormControl('')
  });

  currentPageNumber = 1;
  itemPerPage = 10;


  brands = [];

  // tslint:disable-next-line:variable-name
  create_new_brand_errors: any = {
    name: '',
    description: '',
    icon: ''
  };

  // tslint:disable-next-line:variable-name
  update_brand_errors: any = {
    name: '',
    description: '',
    icon: ''
  };


  brandUpdateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    icon: new FormControl('')
  });

  // tslint:disable-next-line:variable-name
  selected_item: any = {};

  ngOnInit(): void {
    this.initBrands();
  }


  create_new_brand(): void{
    this.create_new_brand_errors = {
      name: '',
      description: '',
      icon: ''
    };
    this.loading = true;
    const form = new FormData();
    form.append('name', this.brandCreateForm.get('name').value);
    form.append('description', this.brandCreateForm.get('description').value);
    form.append('icon', this.brandCreateForm.get('icon').value);

    this.api.post('/classified_brand/create', form).subscribe(
      res => {
        this.loading = false;
        this.toastr.success('New brand added!');
        this.modelService.dismissAll();
        this.create_new_brand_errors = {
          name: '',
          description: '',
          icon: ''
        };
        this.initBrands();
      },
      err => {
        this.loading = false;
        this.create_new_brand_errors = {...err.errors};
      }
    );


  }

  patch_image(event): void{
    if (event.target.files[0]){
      this.brandCreateForm.patchValue({icon: event.target.files[0]});
    }else{
      this.brandCreateForm.patchValue({icon: ''});
    }

  }

  patch_update_image(event): void{
    if (event.target.files[0]){
      this.brandUpdateForm.patchValue({icon: event.target.files[0]});
    }else{
      this.brandUpdateForm.patchValue({icon: ''});
    }
  }

  open(content): void{
    this.modelService.open(content, {
      centered: true
    });
  }

  open_delete_brand_modal(content, brand): void{
    this.selected_item = brand;
    this.open(content);
  }

  delete_brand_(): void{
    this.loading = true;
    this.api.post('/classified_brand/delete/' + this.selected_item.id, {}).subscribe(
      res => {
        this.loading = false;
        this.modelService.dismissAll();
        this.toastr.success('Brand Deleted!');
        this.selected_item = {};
        this.initBrands();
      },
      err => {
        this.loading = false;
        this.toastr.error('Something went wrong!');
      }
    );

  }


  open_update_brand_modal(content, brand): void{
    this.selected_item = brand;
    this.brandUpdateForm.patchValue({
      name: brand.name,
      description: brand.description || '',
      icon: brand.icon || ''
    });
    this.open(content);
  }

  submit_update_form(): void{
    this.update_brand_errors = {};
    this.loading = true;
    const form = new FormData();
    form.append('name', this.brandUpdateForm.get('name').value);
    form.append('description', this.brandUpdateForm.get('description').value);
    form.append('icon', this.brandUpdateForm.get('icon').value);
    this.api.post('/classified_brand/update/' + this.selected_item.id, form).subscribe(
      res => {
        this.loading = false;
        this.toastr.info('Brand updated!');
        this.modelService.dismissAll();
        this.selected_item = {};
        this.initBrands();
      },
      err => {
        this.loading = false;
        this.toastr.error('Something went wrong!');
        this.update_brand_errors = err.errors;
      }
    );
  }


  initBrands(): void{
    this.api.get('/classified_brand/all').subscribe(
      res => {
        this.brands = res.data;
      },
      err => {
        this.toastr.warning('Something went wrong!');
      }
    );
  }

  pageChange(event): any {
    this.currentPageNumber = event;
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
  }

}
