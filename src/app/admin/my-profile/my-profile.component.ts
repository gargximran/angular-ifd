import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ApiService} from '../../service/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private auth: AuthService, private api: ApiService, private toastr: ToastrService) { }
  loading = false;

  udpateProfile = new FormGroup({
    email: new FormControl({value: '', disabled: true}),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl(''),
    username: new FormControl({value: '', disabled: true})
  });


  ngOnInit(): void {
   this.udpateProfile.patchValue({
     email: this.auth._getUser_().email,
     first_name: this.auth._getUser_().first_name,
     last_name: this.auth._getUser_().last_name,
     username: this.auth._getUser_().username,
     phone: this.auth._getUser_().phone
   });
  }

  updateProfileClick(): void{
    this.loading = true;
    const form = new FormData();
    form.append('first_name', this.udpateProfile.get('first_name').value || '');
    form.append('last_name', this.udpateProfile.get('last_name').value || '');
    form.append('phone', this.udpateProfile.get('phone').value || '');
    this.api.post('/user/update-my-profile', form).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success(res.message);
        this.ngOnInit();
      },
      (err) => {
        this.loading = false;
        this.udpateProfile.setErrors({...err.errors});
        this.toastr.success(err.message);
      }
    );
  }

}
