import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryByCategoryCityComponent } from './directory-by-category-city.component';

describe('DirectoryByCategoryCityComponent', () => {
  let component: DirectoryByCategoryCityComponent;
  let fixture: ComponentFixture<DirectoryByCategoryCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryByCategoryCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryByCategoryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
