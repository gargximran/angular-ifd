import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { url } from '../../../env';
import { Response } from '../../../models/api_response';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, zoomIn } from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fade_in', [transition('void => *', useAnimation(fadeIn))]),
    trigger('zoom_in', [transition('void => *', useAnimation(zoomIn))]),
  ],
})
export class HomeHeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  loginError = '';
  loading = false;
  isLogged = false;

  loginForm1 = new FormGroup({
    email1: new FormControl(''),
    password1: new FormControl(''),
    remember1: new FormControl(''),
  });

  registrationType = 'professional';

  registrationForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl('')
  });



  public isModalOpen = false;
  public modalOptions = {
    width: '70',
    height: '70',
    data: { authors: [{ name: 'Joe Seph', books: 23 }] },
  };

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  toggleInModalAction(buttonActive, buttonClose, open, close) {
    buttonActive.classList.add('active');
    buttonClose.classList.remove('active');
    open.style.display = '';
    close.style.display = 'none';
  }

  ngOnInit(): void {
    this.isLogged = false;
    if (this.auth.isLoggedIn){
      this.isLogged = true;
    }
  }

  

  registration(): void{
    this.loading = true;
    const form = new FormData();
    form.append('first_name', this.registrationForm.get('first_name').value || '');
    form.append('last_name', this.registrationForm.get('last_name').value || '');
    form.append('email', this.registrationForm.get('email').value || '');
    form.append('phone', this.registrationForm.get('phone').value || '');
    form.append('password', this.registrationForm.get('password').value || '');
    form.append('username', this.registrationForm.get('username').value || '');
    form.append('type', this.registrationType);

    this.http.post(`${url}/user/register`, form).subscribe(
      (res: Response) => {
        this.loading = false;
        localStorage.setItem('__auth_session__', JSON.stringify(res.data));
        this.toastr.success(res.message);
        this.modalService.dismissAll();
        this.router.navigateByUrl('/dashboard'); 
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error.message)
        this.registrationForm.setErrors({
          ...err.error.errors
        });
      }
    )


  }



  login(): void{
    let formData = new FormData();
    formData.append('email', this.loginForm1.get('email1').value);
    formData.append('password', this.loginForm1.get('password1').value);
    formData.append('remember', this.loginForm1.get('remember1').value);
    this.loading = true;
    this.loginError = ' ';

    this.http.post(`${url}/user/login`, formData).subscribe(
      (res: Response) => {
        localStorage.setItem('__auth_session__', JSON.stringify(res.data));
        this.loginError = ' ';
        let supperthis = this;
        supperthis.loading = false;
        this.toastr.success('Login successfull!')
        supperthis.modalService.dismissAll();
        supperthis.router.navigateByUrl('/dashboard');  

      },
      (error: any) => {
        this.loading = false;
        this.loginError = 'Unknown Credentials!';
      }
    );
  }
}
