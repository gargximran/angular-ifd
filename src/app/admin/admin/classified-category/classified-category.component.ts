import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classified-category',
  templateUrl: './classified-category.component.html',
  styleUrls: ['./classified-category.component.css'],
})
export class ClassifiedCategoryComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  loading = false;

  createNewCategoryErrors: any = {
    name: '',
    description: '',
    icon: '',
    parent: ''
  };

  parentValue = '';

  parentCategory: Select2Data = [];



  classifiedCategoryCreateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    parent: new FormControl(''),
    icon: new FormControl('')
  });

  url = {
    initCategoryTree: '',
    initParentCategory: '',
    createNew: '',
    getChildCategory: '',
    deleteCategory: ''
  };

  categoryTree: any = [];



  selectedItem: any = {
    id: '',
    name: '',
    icon: '',
    description: '',
    clear: () => {
      this.selectedItem.id = '';
      this.selectedItem.name = '',
      this.selectedItem.icon = '',
      this.selectedItem.description = '';
    }
  };


  updateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    icon: new FormControl('')
  });



  // tslint:disable-next-line:typedef
  create_new_category() {
    this.createNewCategoryErrors = [];
    this.loading = true;
    const form = new FormData();
    form.append('name', this.classifiedCategoryCreateForm.get('name').value || '');
    form.append(
      'description',
      this.classifiedCategoryCreateForm.get('description').value || ''
    );
    form.append(
      'parent',
      this.classifiedCategoryCreateForm.get('parent').value || ''
    );
    form.append('icon', this.classifiedCategoryCreateForm.get('icon').value);
    this.api.post(this.url.createNew, form).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success('Category created!');
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      (err) => {
        this.loading = false;
        this.toastr.error('Invalid input!');
        this.createNewCategoryErrors = err.errors;
      }
    );
  }

  ngOnInit(): void {
    this.url.initCategoryTree = '/classified_category/get_categories';
    this.url.initParentCategory = '/classified_category/get_parent_category';
    this.url.createNew = '/classified_category/create';
    this.url.getChildCategory = '/classified_category/get_child_from_parent/';
    this.url.deleteCategory = '/classified_category/delete/';
    this.initParentCategory();
    this.initCategoryTree();
    this.classifiedCategoryCreateForm.reset();
  }

  open(content): void {
    this.modalService.open(content, {
      centered: true,
    });
  }

  patchCreateFormImageValue(event): void {
    if (event.target.files[0]) {
      this.classifiedCategoryCreateForm.patchValue({
        icon: event.target.files[0],
      });
    } else {
      this.classifiedCategoryCreateForm.patchValue({ icon: '' });
    }
  }



  initParentCategory(): any {
    this.api.get(this.url.initParentCategory).subscribe(
      (res) => {
        const datas = [];

        res.data.forEach((element) => {
          const data = { label: element.name.toUpperCase(), value: element.id };
          datas.push(data);
        });
        this.parentCategory = [
          {
            label: 'Select Parent',
            options: datas,
          },
        ];
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  initCategoryTree(): any {
    this.api.get(this.url.initCategoryTree).subscribe(
      (res) => {
        this.categoryTree = res.data;
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  openDeleteModal(content, data): void {
    this.selectedItem.id = data.id;
    this.selectedItem.name = data.name;
    this.selectedItem.icon = data.icon || '';
    this.open(content);
  }

  deleteCategoryFunction(): void {
    this.api.post(this.url.deleteCategory + this.selectedItem.id, {}).subscribe(
      res => {
        this.modalService.dismissAll();
        this.toastr.error('Category Deleted!');
        this.selectedItem.clear();
        this.ngOnInit();
      },
      err => {
        this.modalService.dismissAll();
        this.toastr.warning('Something went wrong!');
        this.selectedItem.clear();
      }
    );
  }

  openCategoryEditModal(content, data): void{
    this.selectedItem.id = data.id;
    this.selectedItem.name = data.name;
    this.selectedItem.description = data.description;
    this.selectedItem.icon = data.icon;
    this.open(content);
  }
}
