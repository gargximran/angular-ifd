import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobByCategoryCityComponent } from './job-by-category-city.component';

describe('JobByCategoryCityComponent', () => {
  let component: JobByCategoryCityComponent;
  let fixture: ComponentFixture<JobByCategoryCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobByCategoryCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobByCategoryCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
