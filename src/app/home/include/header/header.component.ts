import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { url } from '../../../env';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../../service/auth.service';
import { Response } from '../../../models/api_response';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, zoomIn } from 'ng-animate';

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
  public isModalOpen = false;
  public modalOptions = {
    width: '70',
    height: '70',
    data: { authors: [{ name: 'Joe Seph', books: 23 }] },
  };

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router
  ) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  toggleInModalAction(buttonActive, buttonClose, open, close) {
    buttonActive.classList.add('active');
    buttonClose.classList.remove('active');
    open.style.display = '';
    close.style.display = 'none';
  }

  ngOnInit(): void {}

  loginSuccess = '';
  loginError = '';
  loading = false;

  loginForm1 = new FormGroup({
    email1: new FormControl(''),
    password1: new FormControl(''),
    remember1: new FormControl(''),
  });

  login() {
    let formData = new FormData();
    formData.append('email', this.loginForm1.get('email1').value);
    formData.append('password', this.loginForm1.get('password1').value);
    formData.append('remember', this.loginForm1.get('remember1').value);
    this.loading = true;
    this.loginError = ' ';
    this.loginSuccess = ' ';

    this.http.post(`${url}/user/login`, formData).subscribe(
      (res: Response) => {
        localStorage.setItem('__auth_session__', JSON.stringify(res.data));
        this.loginError = ' ';
        this.loginSuccess = 'Login Successfull ! Redirecting';
        let x = 1;
        let supperthis = this;
        supperthis.loading = false;
        
        function rec() {
          if (x < 4) {
            setTimeout(() => {
              supperthis.loginSuccess += '.';
              x++;
              rec();
            }, 400);
          } else {
            supperthis.modalService.dismissAll()
            supperthis.router.navigateByUrl('/dashboard');
          }
        }

        rec();
      },
      (error: any) => {
        this.loading = false;
        this.loginSuccess = ' ';
        this.loginError = 'Unknown Credentials!';
      }
    );
  }
}
