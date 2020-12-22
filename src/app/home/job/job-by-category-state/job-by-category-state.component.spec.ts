import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobByCategoryStateComponent } from './job-by-category-state.component';

describe('JobByCategoryStateComponent', () => {
  let component: JobByCategoryStateComponent;
  let fixture: ComponentFixture<JobByCategoryStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobByCategoryStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobByCategoryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
