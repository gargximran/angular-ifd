import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HomeHeaderComponent implements OnInit {


  public isModalOpen = false;
  public modalOptions = {
    width: "70",
    height: "70",
    data: {authors: [{name: "Joe Seph", books: 23}]}
  }

  toggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }

  constructor(private modalService: NgbModal) { }



  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
    console.log(content)
  }

  toggleInModalAction(buttonActive, buttonClose, open, close){
    buttonActive.classList.add('active')
    buttonClose.classList.remove('active')
    open.style.display = ""
    close.style.display = "none"
  }

  ngOnInit(): void {
  }

}
