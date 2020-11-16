import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomInRight, zoomOutRight } from 'ng-animate';


@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css'],
  animations: [
    trigger('SlideRight', [transition('void => *', useAnimation(zoomInRight)), transition('* => void', useAnimation(zoomOutRight))])
  ],
})
export class StatesComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal, private toastr: ToastrService, private api: ApiService) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  delete_item = {
    id: '',
    name: '',
    slug: '',
    created_at: '',
    index: ''
  }

  edit_item = {
    id: '',
    name: '',
    slug: '',
    created_at: '',
    index: ''
  }

  new_state_error = ' '
  update_state_error = ''
  loading = false

  newState = new FormGroup({
    name: new FormControl('')
  })

  updateStateForm = new FormGroup({
    name: new FormControl(this.edit_item.name)
  })

  open_update_modal(content, index){
    this.edit_item = this.states[index]
    this.updateStateForm.patchValue({"name": this.edit_item.name})
    this.open(content)
  }

  open_delete_modal(content, index){
    this.delete_item = this.states[index]
    this.open(content)
  }

  delete_state_(){
    this.api.post("/state/delete/"+ this.delete_item.id, {}).subscribe(
      res => {
        this.toastr.info("State Deleted!")
        this.modalService.dismissAll()
        this.states.splice(parseInt(this.delete_item.index), 1)
      },
      err => {
        this.toastr.error('Something went wrong!')
        this.modalService.dismissAll()
      }
    )
  }

  updateState(){
    let formdata = new FormData()
    formdata.append('name', this.updateStateForm.get('name').value)
    this.loading = true
    this.update_state_error = ''
    this.api.post(`/state/update/${this.edit_item.id}`, formdata).subscribe(
      res => {
        this.toastr.success('State updated successfuly!')
        this.loading = false
        this.modalService.dismissAll()
        this.states.splice(parseInt(this.edit_item.index), 1, res.data)


      },
      err => {
        this.loading = false
        this.update_state_error = err.errors.name
        this.toastr.error('Something went wrong!')
      }
    )
  }

  open(content) {
    this.modalService.open(content, {centered:true, backdropClass: 'dark-backdrop'});
  }

  createState(){
    this.loading = true
    this.new_state_error = ' '
    let stateForm = new FormData()
    stateForm.append('name', this.newState.get('name').value)
    this.api.post('/state/create', stateForm).subscribe(res => {
      this.loading = false
      this.toastr.success('State added successfully!')
      this.modalService.dismissAll()
      this.states.push(res.data)
    }, 
    err => {
      if(err.errors){
        this.loading = false

        this.toastr.error('Invalid Input!')
        this.new_state_error = err.errors.name
      }
    })
  }


  states = []

  initialize_all_states(){
    this.api.get('/state/view').subscribe(
      res=> {
        this.states = res.data
      },
      err => {
        this.toastr.warning('Something went wrong!')
      }
    )
  }

  ngOnInit(): void {
   this.initialize_all_states()
  }

}
