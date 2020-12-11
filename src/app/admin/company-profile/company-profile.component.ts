import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import {Select2Data} from 'ng-select2-component';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private auth: AuthService, private api: ApiService) { }

  editMode = true;

  categoryDataForFormSelector: Select2Data = [];
  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];

  formData = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    address: new FormControl('')
  });

  companyDetail = {
    name: '',
    url: '',
    category: [],
    description: '',
    logo: 'assets/images/dumylogo.png',
    city: {},
    state: {}
  };

  ngOnInit(): void {
    this.initAllCategory();
    this.initialize_all_states();
    if (this.auth.CompanyProfile){
      this.formData.patchValue({
        name: this.auth.CompanyProfile.name
      });
      this.companyDetail.logo = this.auth.CompanyProfile.logo || 'assets/images/dumylogo.png';
      console.log(this.auth.CompanyProfile);
    }
  }

  initAllCategory(): any {
    this.api.get('/job_category/get_categories').subscribe(
      (res) => {
        const datas = [];

        res.data.forEach((element) => {
          const data = { label: element.name, value: element.id, classes: 'company-profile-category' };
          datas.push(data);
        });
        this.categoryDataForFormSelector = [
          {
            label: 'Select Categories',
            options: datas,
          },
        ];
      },
      (err) => {}
    );
  }

  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        const datas = [];
        res.data.forEach(value => {
          const data = {label: value.name, value: value.id, classes: 'company-profile-category'};
          datas.push(data);
        });
        this.stateDataForFormSelector = [
          {
            label: 'Select State',
            options: datas
          }
        ];

      },
      err => {

      }
    );
  }

  getCity(e): void{
    this.formData.get('city').reset();
    if (e.value){
      this.api.get('/state/view/' + e.value + '/cities').subscribe(
        res => {
          const datas = [];
          res.data.forEach((element) => {
            const data = { label: element.name, value: element.id, classes: 'company-profile-category' };
            datas.push(data);
          });
          this.cityDataForFormSelector = [
            {
              label: 'Select City',
              options: datas
            }
          ];
        },
        err => {}
      );
    }
  }

  con(v): void{
    console.log(v);
  }


}
