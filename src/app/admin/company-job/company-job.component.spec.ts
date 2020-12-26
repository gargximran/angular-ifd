import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobComponent } from './company-job.component';

describe('CompanyJobComponent', () => {
  let component: CompanyJobComponent;
  let fixture: ComponentFixture<CompanyJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
