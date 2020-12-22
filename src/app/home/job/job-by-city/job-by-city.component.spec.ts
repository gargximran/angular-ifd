import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobByCityComponent } from './job-by-city.component';

describe('JobByCityComponent', () => {
  let component: JobByCityComponent;
  let fixture: ComponentFixture<JobByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobByCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
