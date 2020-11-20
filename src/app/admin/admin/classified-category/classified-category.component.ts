import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Select2Data} from 'ng-select2-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../service/api.service';

@Component({
  selector: 'app-classified-category',
  templateUrl: './classified-category.component.html',
  styleUrls: ['./classified-category.component.css']
})
export class ClassifiedCategoryComponent implements OnInit {

  constructor(private modalService: NgbModal, private api: ApiService) {
  }

  loading = false;

  parent: Array<any> = [];
  subParent: Array<any> = [];


  parentCategory: Select2Data = [
    {
      label: 'Select parent',
      options: this.parent
    }
  ];

  subParentCategory: Select2Data = [
    {
      label: 'Select Sub Parent',
      options: this.subParent
    }
  ];

    categoryCreateErrors: any = {};

    classifiedCategoryCreateForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      parent: new FormControl(''),
      icon: new FormControl('')
    });

    update(value): any {
      console.log(value.value);
    }

  updateSubParent(value): any {
      console.log(value.value);
  }

    // tslint:disable-next-line:typedef
    create_new_category() {
      console.log('create');
    }

    ngOnInit(): void {
      this.initCategory();
    }

    open(content): void {
      this.modalService.open(content, {
        centered: true
      });
    }

    initCategory(): any{
      this.api.get('/classified_category/parent_category').subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }

      );
    }

  }
