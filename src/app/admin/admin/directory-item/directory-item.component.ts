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

  createNewDirectoryErrors: any = {
    title: '',
    description: '',
    category: '',
    address: '',
    city: '',
    state: '',
    image: ''
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
    email: new FormControl(''),
    phone: new FormControl('')
  });

  directories = [];

  selectedItem: any = {
    id: '',
    name: '',
    icon: '',
    description: '',
    parent: ''
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

  getCity(e): void{
    this.directoryCreateForm.get('city').reset();
    this.api.get('/state/view/' + e.value + '/cities').subscribe(
      res => {
        const datas = [];
        res.data.forEach((element) => {
          const data = { label: element.name.toUpperCase(), value: element.id };
          datas.push(data);
        });
        this.cityDataForFormSelector = [
          {
            label: 'Select City',
            options: datas
          }
        ];
      },
      err => {

      }
    );
  }


  // tslint:disable-next-line:typedef
  create_new_directory(): void{
    this.createNewDirectoryErrors = {
      title: '',
      description: '',
      category: '',
      address: '',
      city: '',
      state: '',
      image: '',
      phone: '',
      email: ''
    };
    this.loading = true;
    const form = new FormData();
    form.append('title', this.directoryCreateForm.get('title').value || '');
    form.append('description', this.directoryCreateForm.get('description').value || '');
    form.append('address', this.directoryCreateForm.get('address').value || '');
    form.append('city', this.directoryCreateForm.get('city').value || '');
    form.append('state', this.directoryCreateForm.get('state').value || '');
    form.append('image', this.uploadedImages[0] || '');
    form.append('email', this.directoryCreateForm.get('email').value || '');
    form.append('phone', this.directoryCreateForm.get('phone').value || '');
    form.append('category', String(this.directoryCreateForm.get('category').value) || '');
    this.api.post('/directory_item/create', form).subscribe(
       res => {
         this.loading = false;
         this.toastr.success('Directory created successfully!');
         this.ngOnInit();
      },
       err => {
         this.loading = false;
         this.createNewDirectoryErrors = {...this.createNewDirectoryErrors, ...err.errors};
         this.toastr.warning('Please check input again!');
       }
   );


  }

  ngOnInit(): void {
    this.fetchDirectory();
    this.initAllCategory();
    this.initialize_all_states();
    this.directoryCreateForm.reset();
    this.modalService.dismissAll();
  }



  addImage(e: FileHolder): void{
    this.uploadedImages.push(e.file);
  }

  removeImage(e: FileHolder): void{
    // tslint:disable-next-line:triple-equals
    this.uploadedImages = this.uploadedImages.filter(value => value != e.file);
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

      }
    );
  }

  fetchDirectory(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));

    this.api.post('/directory_item/get_directories', form).subscribe(
      (res) => {
        this.totalVolume = res.data.count;
        this.directories = res.data.collections;
        console.log(this.directories);
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchDirectory();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchDirectory();
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



}
