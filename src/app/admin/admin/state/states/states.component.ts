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

  currentPageNumber = 1;
  itemPerPage = 10;

  // tslint:disable-next-line:variable-name
  delete_item: any = {
    id: '',
    name: '',
    slug: '',
    created_at: '',
    index: ''
  };

  // tslint:disable-next-line:variable-name
  edit_item = {
    id: '',
    name: '',
    slug: '',
    created_at: '',
    index: ''
  };

  // tslint:disable-next-line:variable-name
  new_state_error = ' ';
  // tslint:disable-next-line:variable-name
  update_state_error = '';
  loading = false;

  newState = new FormGroup({
    name: new FormControl('')
  });

  updateStateForm = new FormGroup({
    name: new FormControl(this.edit_item.name)
  });


  states = [];

  // tslint:disable-next-line:typedef
  open_update_modal(content, state){
    this.edit_item = state;
    this.updateStateForm.patchValue({name: this.edit_item.name});
    this.open(content);
  }

  // tslint:disable-next-line:typedef
  open_delete_modal(content, state){
    this.delete_item = state;
    this.open(content);
  }

  // tslint:disable-next-line:typedef
  delete_state_(){
    this.api.post('/state/delete/' + this.delete_item.id, {}).subscribe(
      res => {
        this.toastr.info('State Deleted!');
        this.modalService.dismissAll();
        // tslint:disable-next-line:radix
        this.states.splice(parseInt(this.delete_item.index), 1);

        this.initialize_all_states();
      },
      err => {
        this.toastr.error('Something went wrong!');
        this.modalService.dismissAll();
      }
    );
  }

  // tslint:disable-next-line:typedef
  updateState(){
    const formdata = new FormData();
    formdata.append('name', this.updateStateForm.get('name').value);
    this.loading = true;
    this.update_state_error = '';
    this.api.post(`/state/update/${this.edit_item.id}`, formdata).subscribe(
      res => {
        this.toastr.success('State updated successfuly!');
        this.loading = false;
        this.modalService.dismissAll();
        this.initialize_all_states();
      },
      err => {
        this.loading = false;
        this.update_state_error = err.errors.name;
        this.toastr.error('Something went wrong!');
      }
    );
  }

  open(content): void {
    this.modalService.open(content, {centered: true, backdropClass: 'dark-backdrop'});
  }

  // tslint:disable-next-line:typedef
  createState(){
    this.loading = true;
    this.new_state_error = ' ';
    const stateForm = new FormData();
    stateForm.append('name', this.newState.get('name').value);
    this.api.post('/state/create', stateForm).subscribe(res => {
      this.loading = false;
      this.toastr.success('State added successfully!');
      this.modalService.dismissAll();
      this.states.push(res.data);
    },
    err => {
      if (err.errors){
        this.loading = false;

        this.toastr.error('Invalid Input!');
        this.new_state_error = err.errors.name;
      }
    });
  }

  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        this.states = res.data;
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

  ngOnInit(): void {
   this.initialize_all_states();
  }

}
