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

  new_state_error = ' '
  loading = false

  newState = new FormGroup({
    name: new FormControl('')
  })

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
        console.log(this.states)
      },
      err => {
        this.toastr.warning('Something went wrong!')
      }
    )
  }

  ngOnInit(): void {
   this.initialize_all_states()


   setTimeout(()=>{
     this.states.splice(2, 1)
   }, 1000)
  }

}
