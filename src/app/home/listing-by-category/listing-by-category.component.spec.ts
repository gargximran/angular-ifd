import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingByCategoryComponent } from './listing-by-category.component';

describe('ListingByCategoryComponent', () => {
  let component: ListingByCategoryComponent;
  let fixture: ComponentFixture<ListingByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
