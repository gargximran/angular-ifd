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

  ngOnInit(): void {
    if(this.auth.CompanyProfile){
      this.formData.patchValue({
        name: this.auth.CompanyProfile.name
      })
      this.companyLogo = this.auth.CompanyProfile.logo || 'assets/images/dumylogo.png';
      console.log(this.auth.CompanyProfile)
    }
  }

  companyLogo: string = 'assets/images/dumylogo.png';


  formData = new FormGroup({
    name: new FormControl('')
  });

}
