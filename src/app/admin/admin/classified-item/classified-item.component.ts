import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../../service/api.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {Select2Data} from 'ng-select2-component';
import {FormControl, FormGroup} from '@angular/forms';
import {FileHolder} from 'angular2-image-upload';


@Component({
  selector: 'app-classified-item',
  templateUrl: './classified-item.component.html',
  styleUrls: ['./classified-item.component.css']
})
export class ClassifiedItemComponent implements OnInit {

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
  existingImageUrl = '';
  uploadedUpdateImage: File = null;

  createNewErrors: any = {
    name: '',
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
  postStatus = 'all';

  stateDataForFormSelector: Select2Data = [];
  cityDataForFormSelector: Select2Data = [];
  categoryDataForFormSelector: Select2Data = [];
  brandDataForFormSelector: Select2Data = [];
  conditionSelectorForForm: Select2Data = [
    {
      label: 'Select Condition',
      options: [
        {label: 'New', value: 'new'},
        {label: 'Used', value: 'used'}
      ]
    }
  ];
  priceTypeSelectorForForm: Select2Data =[
    {
      label: "Select Price Type",
      options: [
        {label: 'Negotiable', value: 'negotiable'},
        {label: 'Fixed', value: 'fixed'}
      ]
    }
  ]

  createForm = new FormGroup({
    name: new FormControl(''),   
    description: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    category: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    brand: new FormControl(''),
    condition: new FormControl(''),
    age: new FormControl(''),
    price_type: new FormControl(''),
    price: new FormControl(''),
    status: new FormControl('')
  });

  products = [];

  selectedItem: any = {
    id: ''
  };

  updateDirectoryErrors: any = {
    title: '',
    description: '',
    category: '',
    address: '',
    city: '',
    state: '',
    image: ''
  };

  updateForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    category: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });

  getCity(e): void{
    this.createForm.get('city').reset();
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
  create_new_submit(): void{
    this.createNewErrors = {
      name: '',
      description: '',
      category: '',
      address: '',
      city: '',
      state: '',
      image: '',
      phone: '',
      email: '',
      brand: '',
      condition: '',
      age: '',
      price_type: '',
      price: '',
      status: ''  
    };
    this.loading = true;
    const form = new FormData();
    form.append('name', this.createForm.get('name').value || '');
    form.append('brand', this.createForm.get('brand').value || '');
    form.append('description', this.createForm.get('description').value || '');
    form.append('condition', this.createForm.get('condition').value || '');
    form.append('age', this.createForm.get('age').value || '');
    form.append('price_type', this.createForm.get('price_type').value || '');
    form.append('price', this.createForm.get('price').value || '');
    this.uploadedImages.forEach(value => {
      form.append('images[]', value);
    })
    form.append('address', this.createForm.get('address').value || '');
    form.append('category', String(this.createForm.get('category').value) || '');
    form.append('state', String(this.createForm.get('state').value) || '');
    form.append('city', String(this.createForm.get('city').value) || '');

    this.api.post('/classified_product/create', form).subscribe(
       res => {
         this.loading = false;
         this.toastr.success('Classified Listed Successfully!');
         this.ngOnInit();
      },
       err => {
         this.loading = false;
         this.createNewErrors = {...this.createNewErrors, ...err.errors}
         this.toastr.warning('Please check input again!');
       }
   );


  }

  ngOnInit(): void {
    this.fetchData();
    this.initAllCategory();
    this.initialize_all_states();
    this.initialize_all_brands();
    this.modalService.dismissAll();
    this.createForm.reset();
    this.uploadedImages = []
    this.updateForm.reset();
    this.loading = false;
  }



  addImage(e: FileHolder): void{
    this.uploadedImages.push(e.file);
  }
  addUpdateImage(e: FileHolder): void{
    this.uploadedUpdateImage = e.file;

  }

  removeImage(e: FileHolder): void{
    // tslint:disable-next-line:triple-equals
    this.uploadedImages = this.uploadedImages.filter(value => value != e.file);
  }

  removeUpdateImage(e: FileHolder): void{
    // tslint:disable-next-line:triple-equals
    this.uploadedUpdateImage = null;
  }

  open(content): void {
    this.modalService.open(content, {
      centered: true,
      size: 'xl'
    });
  }

  initAllCategory(): any {
    this.api.get('/classified_category/get_categories').subscribe(
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

  initialize_all_brands(): void{
    this.api.get('/classified_brand/all').subscribe(
      res => {
        const datas = [];
        res.data.forEach(value => {
          const data = {label: value.name.toUpperCase(), value: value.id};
          datas.push(data);
        });
        this.brandDataForFormSelector = [
          {
            label: 'Select brand',
            options: datas
          }
        ];

      },
      err => {

      }
    );
  }

  fetchData(): any {
    const form = new FormData();
    form.append('itemPerPage', String(this.itemPerPage));
    form.append('pageNumber', String(this.currentPageNumber));
    form.append('status', this.postStatus || 'all')

    this.api.post('/classified_product/get_products', form).subscribe(
      (res) => {
        console.log(res)
        this.totalVolume = res.data.count;
        this.products = res.data.collections;
      },
      (err) => {
        this.toastr.error('Something went wrong!');
      }
    );
  }

  pageChange(event): any {
    this.currentPageNumber = event;
    this.fetchData();
  }
  ChangeItemPerPageSize(event): void {
    this.itemPerPage = event.target.value;
    this.fetchData();
  }

  openDeleteAlert(data): void{
    this.selectedItem.id = data.id;
    this.deleteSwal.title = `Delete directory ?`;
    this.deleteSwal.fire();
  }

  ChangePostStatus(event): void{
    this.postStatus = event.target.value
    this.fetchData();
  }

  deleteCategory(): void {
    this.api
      .post('/directory_item/delete/' + this.selectedItem.id, {})
      .subscribe(
        (res) => {
          this.deleteSuccess.fire();
          this.selectedItem.id = '';
          this.ngOnInit();
        },
        (err) => {
          this.deleteSuccess.fire({
            icon: 'error',
            title: 'Something went wrong!',
          });
          this.selectedItem.id = '';
          this.ngOnInit();
        }
      );
  }

  cancelDelete(): void {
    this.selectedItem.id = '';
  }

  openCategoryEditModal(content, data): void {
    this.updateForm.reset();
    const category = data.category.map(value => value.id);
    console.log(category);
    this.selectedItem.id = data.id;
    this.updateForm.patchValue({
      title: data.title || '',
      description: data.description || '',
      state: data.state.id || '',
      city: data.city.id || '',
      category: category || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || ''
    });
    this.existingImageUrl = data.image || 'assets/images/dumylogo.png';
    this.open(content);
  }

  submitUpdateForm(): void {
    this.loading = true;
    const form = new FormData();
    form.append('title', this.updateForm.get('title').value);
    form.append('description', this.updateForm.get('description').value);
    form.append('address', this.updateForm.get('address').value);
    form.append('state', this.updateForm.get('state').value);
    form.append('city', this.updateForm.get('city').value);
    form.append('image', this.uploadedUpdateImage || '');
    form.append('category', String(this.updateForm.get('category').value));
    form.append('email', this.updateForm.get('email').value);
    form.append('phone', this.updateForm.get('phone').value);

    this.api.post('/directory_item/update/' + this.selectedItem.id, form).subscribe(
      res => {
        this.loading = false;
        this.toastr.success('Directory updated!');
        this.modalService.dismissAll();
        this.selectedItem = '';
        this.uploadedUpdateImage = null;
        this.ngOnInit();
      },
      err => {
        this.loading = false;
        this.toastr.warning('Please check input again!');
      }
    );
  }

}
