import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-directory-category',
  templateUrl: './directory-category.component.html',
  styleUrls: ['./directory-category.component.css']
})
export class DirectoryCategoryComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private api: ApiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('deleteSwal') deleteSwal;
  @ViewChild('deleteSuccess') deleteSuccess;

  loading = false;
  parentValue = '';

  createNewCategoryErrors: any = {
    name: '',
    description: '',
    icon: '',
    parent: '',
  };

  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;

  parentCategory: Select2Data = [];

  classifiedCategoryCreateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    parent: new FormControl(''),
    icon: new FormControl(''),
  });

  categories = [];

  selectedItem: any = {
    id: '',
    name: '',
    icon: '',
    description: '',
    parent: '',
    clear: () => {
      this.selectedItem.id = '';
      this.selectedItem.name = '';
      this.selectedItem.icon = '';
      this.selectedItem.description = '';
      this.selectedItem.parent = '';
    },
  };

  updateCategoryErrors: any = {
    name: '',
    description: '',
    icon: '',
    parent: '',
  };

  updateForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    parent: new FormControl(''),
    icon: new FormControl(''),
  });

  // tslint:disable-next-line:typedef
  create_new_category() {
    this.createNewCategoryErrors = [];
    this.loading = true;
    const form = new FormData();
    form.append(
      'name',
      this.classifiedCategoryCreateForm.get('name').value || ''
    );
    form.append(
      'description',
      this.classifiedCategoryCreateForm.get('description').value || ''
    );
    form.append(
      'parent',
      this.classifiedCategoryCreateForm.get('parent').value || ''
    );
    form.append('icon', this.classifiedCategoryCreateForm.get('icon').value);
    this.api.post('/directory_category/create', form).subscribe(
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
    this.fetchCategories();
    this.initAllCategory();
    this.classifiedCategoryCreateForm.reset();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.route.paramMap.subscribe(
      d => {
        // tslint:disable-next-line:variable-name
        const parent_id = d.get('parent');
        if (parent_id){
          if (this.parentValue !== parent_id){
            this.parentValue = parent_id;
            this.ngOnInit();
          }
        }
      }
    );
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

  patchUpdateImageValue(event): void {
    if (event.target.files[0]) {
      this.updateForm.patchValue({
        icon: event.target.files[0],
      });
    } else {
      this.classifiedCategoryCreateForm.patchValue({ icon: '' });
    }
  }

  initAllCategory(): any {
    this.api.get('/directory_category/get_categories').subscribe(
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

  fetchCategories(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    let url = '';
    this.route.paramMap.subscribe((d) => {
      // tslint:disable-next-line:variable-name
      const parent_id = d.get('parent');
      if (parent_id) {
        url = '/directory_category/get_child/' + parent_id;
      } else {
        url = '/directory_category/get_parent';
      }
    });

    this.api.post(url, form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.categories = res.data.collections;
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchCategories();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchCategories();
  }

  openDeleteAlert(data): void{
    this.selectedItem.name = data.name;
    this.selectedItem.id = data.id;
    this.deleteSwal.title = `Delete ${data.name} ?`;
    this.deleteSwal.fire();
  }

  deleteCategory(): void {
    this.api
      .post('/directory_category/delete/' + this.selectedItem.id, {})
      .subscribe(
        (res) => {
          this.deleteSuccess.fire();
          this.selectedItem.clear();
          this.ngOnInit();
        },
        (err) => {
          this.deleteSuccess.fire({
            icon: 'error',
            title: 'Something went wrong!',
          });
          this.selectedItem.clear();
          this.ngOnInit();
        }
      );
  }

  cancelDelete(): void {
    this.selectedItem.clear();
  }

  openCategoryEditModal(content, data): void {
    this.selectedItem.id = data.id;
    this.selectedItem.icon = data.icon;
    this.updateForm.patchValue({
      name: data.name,
      description: data.description || '',
      parent: data.parent || ''
    });
    this.open(content);
  }

  updateCategory(): any {
    this.updateCategoryErrors = {
      name: '',
      description: '',
      icon: '',
      parent: '',
    };
    this.loading = true;
    const form = new FormData();
    form.append('name', this.updateForm.get('name').value || '');
    form.append('parent', this.updateForm.get('parent').value || '');
    form.append('description', this.updateForm.get('description').value || '');
    form.append('icon', this.updateForm.get('icon').value || '');
    this.api
      .post('/directory_category/update/' + this.selectedItem.id, form)
      .subscribe(
        (res) => {
          this.loading = false;
          this.toastr.success('Category Updated!');
          this.ngOnInit();
          this.modalService.dismissAll();
          this.selectedItem.clear();
          this.updateForm.reset();
        },
        (err) => {
          this.loading = false;
          this.toastr.error('Something went wrong!');
          if (err.errors) {
            this.updateCategoryErrors = err.errors;
          }
        }
      );
  }

}
