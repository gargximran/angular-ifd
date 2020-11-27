import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Select2Data} from 'ng-select2-component';
import {FormControl, FormGroup} from '@angular/forms';
import {FileHolder} from 'angular2-image-upload';

@Component({
  selector: 'app-directory-item',
  templateUrl: './directory-item.component.html',
  styleUrls: ['./directory-item.component.css']
})
export class DirectoryItemComponent implements OnInit {

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

  uploadedImages: File[] = [];

  createNewCategoryErrors: any = {
    name: '',
    description: '',
    icon: '',
    parent: '',
  };

  currentPageNumber = 1;
  totalVolume = 0;
  itemPerPage = 10;

  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];
  categoryDataForFormSelector: Select2Data = [];
  parentCategory: Select2Data = [];

  directoryCreateForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
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
   console.log(this.directoryCreateForm.value);
  }

  ngOnInit(): void {
    this.initAllCategory();
    this.initialize_all_states();
    this.directoryCreateForm.reset();
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

  addImage(e: FileHolder): void{
    this.uploadedImages.push(e.file);
    console.log(this.uploadedImages);
  }

  removeImage(e: FileHolder): void{
    this.uploadedImages = this.uploadedImages.filter(value => value != e.file);
    console.log(this.uploadedImages);
  }

  open(content): void {
    this.modalService.open(content, {
      centered: true,
      size: 'xl'
    });
  }

  initAllCategory(): any {
    this.api.get('/directory_category/get_categories').subscribe(
      (res) => {
        const datas = [];

        res.data.forEach((element) => {
          const data = { label: element.name.toUpperCase(), value: element.id };
          datas.push(data);
        });
        this.categoryDataForFormSelector = [
          {
            label: 'Select Categories',
            options: datas,
          },
        ];
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  initialize_all_states(): void{
    this.api.get('/state/view').subscribe(
      res => {
        const datas = [];
        res.data.forEach(value => {
          const data = {label: value.name.toUpperCase(), value: value.id};
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
        this.toastr.warning('Something went wrong!');
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
        url = '/classified_category/get_child/' + parent_id;
      } else {
        url = '/classified_category/get_parent';
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
      .post('/classified_category/delete/' + this.selectedItem.id, {})
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
      .post('/classified_category/update/' + this.selectedItem.id, form)
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
