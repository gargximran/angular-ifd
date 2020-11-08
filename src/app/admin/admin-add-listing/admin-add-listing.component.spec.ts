import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddListingComponent } from './admin-add-listing.component';

describe('AdminAddListingComponent', () => {
  let component: AdminAddListingComponent;
  let fixture: ComponentFixture<AdminAddListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
