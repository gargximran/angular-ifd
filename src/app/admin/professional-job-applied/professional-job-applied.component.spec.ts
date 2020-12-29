import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalJobAppliedComponent } from './professional-job-applied.component';

describe('ProfessionalJobAppliedComponent', () => {
  let component: ProfessionalJobAppliedComponent;
  let fixture: ComponentFixture<ProfessionalJobAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalJobAppliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalJobAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
