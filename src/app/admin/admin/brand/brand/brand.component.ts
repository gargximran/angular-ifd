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

  create_new_brand_errors: any = {
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


  initBrands(){
    this.api.get('/classified_brand/all').subscribe(
      res=> {
        this.brands = [...res.data]
      },
      err => {
        this.toastr.warning('Something went wrong!')
      }
    )
  }

}
