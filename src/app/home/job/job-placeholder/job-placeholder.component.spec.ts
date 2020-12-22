import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPlaceholderComponent } from './job-placeholder.component';

describe('JobPlaceholderComponent', () => {
  let component: JobPlaceholderComponent;
  let fixture: ComponentFixture<JobPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
