import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedCategoryComponent } from './classified-category.component';

describe('ClassifiedCategoryComponent', () => {
  let component: ClassifiedCategoryComponent;
  let fixture: ComponentFixture<ClassifiedCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifiedCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
