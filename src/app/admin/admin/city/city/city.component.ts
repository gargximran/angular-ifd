import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(config: NgbModalConfig, private modalService: NgbModal, private toastr: ToastrService, private api: ApiService, private route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // tslint:disable-next-line:variable-name
  selected_item: any = {


  };
  loading = false;

  // tslint:disable-next-line:variable-name
  add_city_errors = {
    name: '',
    state: ''
  };

  // tslint:disable-next-line:variable-name
  update_city_errors = {
    name: '',
    state: ''
  };

  states = [];


  cities: any = [];

  cityCreateForm = new FormGroup({
    name: new FormControl(''),
    state: new FormControl('')
  });

  updateForm = new FormGroup({
    name: new FormControl(''),
    state: new FormControl('')
  });


  // tslint:disable-next-line:variable-name
  state_name = null;

  ngOnInit(): void {
    this.initialize_all_states();
    this.initialize_all_cities();
  }

  // tslint:disable-next-line:typedef
  create_new_state(){
    this.loading = true;
    this.add_city_errors = {...this.add_city_errors, name: '', state: ''};
    const form = new FormData();
    form.append('name', this.cityCreateForm.get('name').value);
    form.append('state', this.cityCreateForm.get('state').value);

    this.api.post('/city/create', form).subscribe(
      res => {
        this.loading = false;
        this.add_city_errors = {...this.add_city_errors, name: '', state: ''};
        this.toastr.success('New City addes!');
        this.initialize_all_cities();
        this.modalService.dismissAll();
        this.cityCreateForm.reset();
      },
      err => {
        this.loading = false;
        this.add_city_errors = {...err.errors};

      }
    );
  }

  // tslint:disable-next-line:typedef
  update_city_(){
    this.loading = true;
    const form = new FormData();
    form.append('name', this.updateForm.get('name').value);
    form.append('state', this.updateForm.get('state').value);

    this.api.post('/city/update/' + this.selected_item.id, form).subscribe(
      res => {
        this.selected_item = {
          state: {
            id: null
          }
        };
        this.loading = false;
        this.modalService.dismissAll();
        this.toastr.info('City updated!');
        this.initialize_all_cities();
      },
      err => {
        this.toastr.error('Update failed!');
        this.loading = false;
        this.update_city_errors = {...err.errors};
      }
    );
  }

  // tslint:disable-next-line:typedef
  openUPdateModal(content, index){
    this.selected_item = {...this.cities[index]};
    this.updateForm.setValue({name: this.selected_item.name, state: this.selected_item.state.id});
    this.open(content);

  }



  openDeleteModal(content, index): void{
    this.selected_item = {...this.cities[index]};
    this.open(content);
  }


  delete_city_function(): void{
    this.loading = true;
    this.api.post('/city/delete/' + this.selected_item.id, {}).subscribe(
      res => {
        this.loading = false;
        this.initialize_all_cities();
        this.selected_item = {
          state: {
            name: null
          }
        };
        this.toastr.success('City Deleted Successful!');
        this.modalService.dismissAll();

      },
      err => {
        this.loading = false;
        this.toastr.error('Something went wrong!');
        this.modalService.dismissAll();
      }
    );
  }

  initialize_all_cities(): void{
    this.route.paramMap.subscribe(
      d => {
        const state = d.get('state');
        if (state){
          this.api.get('/state/view/' + state + '/cities').subscribe(
            res => {
              this.cities = res.data;
            },
            err => {
              this.cities = [];
              this.toastr.warning('Someting went wrong!');
            }
          );
        }else{
          this.api.get('/city/view').subscribe(
            res => {
              this.cities = res.data;
            },
            err => {
              this.cities = [];
              this.toastr.warning('Someting went wrong!');
            }
          );

        }

      }
    );

  }


  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        this.states = [...res.data];
      },
      err => {
        this.toastr.warning('Something went wrong!');
      }
    );
  }



  open(content): void {
    this.modalService.open(content, {centered: true});
  }

}
