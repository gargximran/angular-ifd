import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryByCategoryStateComponent } from './directory-by-category-state.component';

describe('DirectoryByCategoryStateComponent', () => {
  let component: DirectoryByCategoryStateComponent;
  let fixture: ComponentFixture<DirectoryByCategoryStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryByCategoryStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryByCategoryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
