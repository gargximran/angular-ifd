import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  constructor(private auth: AuthService) { }


  private formData = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    logo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('')
  });

  private companyDetail = {
    name: '',
    url: '',
    category: [],
    description: '',
    logo: 'assets/images/dumylogo.png',
    city: {},
    state: {}
  };

  ngOnInit(): void {
    if (this.auth.CompanyProfile){
      this.formData.patchValue({
        name: this.auth.CompanyProfile.name
      });
      this.companyDetail.logo = this.auth.CompanyProfile.logo || 'assets/images/dumylogo.png';
      console.log(this.auth.CompanyProfile);
    }
  }


}
