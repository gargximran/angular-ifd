import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryByCategoryComponent } from './directory-by-category.component';

describe('DirectoryByCategoryComponent', () => {
  let component: DirectoryByCategoryComponent;
  let fixture: ComponentFixture<DirectoryByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
