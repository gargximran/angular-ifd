import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorySingleComponent } from './directory-single.component';

describe('DirectorySingleComponent', () => {
  let component: DirectorySingleComponent;
  let fixture: ComponentFixture<DirectorySingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorySingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
