import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSingleComponent } from './job-single.component';

describe('JobSingleComponent', () => {
  let component: JobSingleComponent;
  let fixture: ComponentFixture<JobSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
