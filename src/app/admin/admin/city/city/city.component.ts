import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
 
  
  constructor(config: NgbModalConfig, private modalService: NgbModal, private toastr: ToastrService, private api: ApiService) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  selected_item: any = {
 

  }
  loading = false

  add_city_errors = {
    name: '',
    state: ''
  }

  update_city_errors = {
    name: '',
    state: ''
  }

  states = []

  ngOnInit(): void {
    this.initialize_all_states()
    this.initialize_all_cities()
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  
    
  }

  cities:any = []

  cityCreateForm = new FormGroup({
    name: new FormControl(""),
    state: new FormControl("")
  })

  updateForm = new FormGroup({
    name: new FormControl(''),
    state: new FormControl('')
  })

  create_new_state(){
    this.loading = true
    this.add_city_errors = {...this.add_city_errors, name: '', state: ''}
    let form = new FormData()
    form.append('name', this.cityCreateForm.get("name").value)
    form.append('state', this.cityCreateForm.get("state").value)

    this.api.post('/city/create', form).subscribe(
      res => {
        this.loading = false
        this.add_city_errors = {...this.add_city_errors, name: '', state: ''}
        this.toastr.success('New City addes!')
        this.cities = [...this.cities, res.data]
        this.modalService.dismissAll()
        this.cityCreateForm.reset()
      },
      err => {
        this.loading = false
        this.add_city_errors = {...err.errors}
        
      }
    )
  }

  update_city_(){
    this.loading = true
    let form = new FormData()
    form.append('name', this.updateForm.get("name").value)
    form.append('state', this.updateForm.get("state").value)

    this.api.post('/city/update/'+this.selected_item.id, form).subscribe(
      res => {
        this.selected_item = {
          state: {
            id: null
          }
        }
        this.loading = false
        this.modalService.dismissAll()
        this.toastr.info("City updated!")
        this.cities.filter((value, index)=>{
          if(value.id == res.data.id){
            this.cities.splice(index, 1, res.data)
          }
        })
      },
      err => {
        this.toastr.error('Update failed!')
        this.loading = false
        this.update_city_errors = {...err.errors}
      }
    )
  }

  openUPdateModal(content, index){
    this.selected_item = {...this.cities[index]}
    this.updateForm.setValue({"name": this.selected_item.name, 'state': this.selected_item.state.id})
    this.open(content)
    
  }



  openDeleteModal(content, index){
    this.selected_item = {...this.cities[index]}
    this.open(content)
  }


  delete_city_function(){
    this.loading = true
    this.api.post('/city/delete/'+this.selected_item.id, {}).subscribe(
      res => {
        this.loading = false
        this.cities.filter((value, index) => {
          if(this.selected_item.id == value.id){
            this.cities.splice(index, 1)
          }
        })
        this.selected_item = {
          state:{
            name: null
          }
        }
        this.toastr.success('City Deleted Successful!')
        this.modalService.dismissAll()
        
      },
      err => {
        this.loading = false
        this.toastr.error('Something went wrong!')
        this.modalService.dismissAll()
      }
    )
  }

  initialize_all_cities(){
    this.api.get('/city/view').subscribe(
      res => {
        this.cities = [...res.data]
      },
      err => {
        this.toastr.warning('Someting went wrong!')
      }
    )
  }


  initialize_all_states(){
    this.api.get('/state/view').subscribe(
      res=> {
        this.states = [...res.data]
      },
      err => {
        this.toastr.warning('Something went wrong!')
      }
    )
  }



  open(content) {
    this.modalService.open(content, {centered:true});
  }

}
