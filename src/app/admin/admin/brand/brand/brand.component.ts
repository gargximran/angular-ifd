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
    description: new FormControl(""),
    icon: new FormControl("")
  })

  ngOnInit(): void {
    this.initBrands()
  }


  brands = []


  create_new_brand(){
    this.create_new_brand_errors = {
      name: '',
      description: '',
      icon: ''
    }
    this.loading = true
    let form = new FormData()
    form.append('name', this.brandCreateForm.get('name').value)
    form.append('description', this.brandCreateForm.get('description').value)
    form.append('icon', this.brandCreateForm.get('icon').value)

    this.api.post('/classified_brand/create', form).subscribe(
      res => {
        this.loading = false
        this.toastr.success('New brand added!')
        this.modelService.dismissAll()
        this.create_new_brand_errors = {
          name: '',
          description: '',
          icon: ''
        }  
        this.initBrands()      
      },
      err => {        
        this.loading = false
        this.create_new_brand_errors = {...err.errors}
      }
    )


  }

  patch_image(event){
    if(event.target.files[0]){
      this.brandCreateForm.patchValue({'icon': event.target.files[0]})
    }else{
      this.brandCreateForm.patchValue({'icon': ''})
    }
    
  }

  patch_update_image(event){
    if(event.target.files[0]){
      this.brandUpdateForm.patchValue({'icon': event.target.files[0]})
    }else{
      this.brandUpdateForm.patchValue({'icon': ''})
    }
  }

  create_new_brand_errors: any = {
    name: '',
    description: '',
    icon: ''
  } 

  update_brand_errors: any = {
    name: '',
    description: '',
    icon: ''
  }


  brandUpdateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(""),
    icon: new FormControl("")
  })

  open(content){
    this.modelService.open(content, {
      centered: true
    })
  }

  selected_item: any = {}

  open_delete_brand_modal(content, brand){
    this.selected_item = brand
    this.open(content)
  }

  delete_brand_(){
    this.loading = true
    this.api.post('/classified_brand/delete/'+ this.selected_item.id, {}).subscribe(
      res => {
        this.loading = false
        this.modelService.dismissAll()
        this.toastr.success('Brand Deleted!')
        this.selected_item = {}
        this.initBrands()
      },
      err => {
        this.loading = false
        this.toastr.error('Something went wrong!')
      }
    )

  }


  open_update_brand_modal(content, brand){
    this.selected_item = brand
    this.brandUpdateForm.patchValue({
      'name': brand.name,
      'description': brand.description || '',
      'icon': brand.icon || ''
    })
    this.open(content)
  }

  submit_update_form(){
    this.update_brand_errors = {}
    this.loading = true
    let form = new FormData()
    form.append('name', this.brandUpdateForm.get('name').value)
    form.append('description', this.brandUpdateForm.get('description').value)
    form.append('icon', this.brandUpdateForm.get('icon').value)
    this.api.post('/classified_brand/update/'+ this.selected_item.id, form).subscribe(
      res => {
        this.loading = false
        this.toastr.info('Brand updated!')
        this.modelService.dismissAll()
        this.selected_item = {}        
        this.initBrands()
      },
      err => {
        this.loading = false
        this.toastr.error('Something went wrong!')
        this.update_brand_errors = err.errors
      }
    )
  }


  initBrands(){
    this.api.get('/classified_brand/all').subscribe(
      res=> {
        this.brands = res.data
      },
      err => {
        this.toastr.warning('Something went wrong!')
      }
    )
  }

}
