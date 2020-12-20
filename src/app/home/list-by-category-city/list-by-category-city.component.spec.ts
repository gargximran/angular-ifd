import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByCategoryCityComponent } from './list-by-category-city.component';

describe('ListByCategoryCityComponent', () => {
  let component: ListByCategoryCityComponent;
  let fixture: ComponentFixture<ListByCategoryCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByCategoryCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByCategoryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
