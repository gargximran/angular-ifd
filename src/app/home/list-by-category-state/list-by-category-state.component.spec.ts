import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByCategoryStateComponent } from './list-by-category-state.component';

describe('ListByCategoryStateComponent', () => {
  let component: ListByCategoryStateComponent;
  let fixture: ComponentFixture<ListByCategoryStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByCategoryStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByCategoryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
