import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobByStateComponent } from './job-by-state.component';

describe('JobByStateComponent', () => {
  let component: JobByStateComponent;
  let fixture: ComponentFixture<JobByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobByStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
