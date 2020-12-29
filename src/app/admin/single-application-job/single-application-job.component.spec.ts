import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleApplicationJobComponent } from './single-application-job.component';

describe('SingleApplicationJobComponent', () => {
  let component: SingleApplicationJobComponent;
  let fixture: ComponentFixture<SingleApplicationJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleApplicationJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleApplicationJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
