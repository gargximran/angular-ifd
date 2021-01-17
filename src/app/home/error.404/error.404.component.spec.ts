import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error.404Component } from './error.404.component';

describe('Error.404Component', () => {
  let component: Error.404Component;
  let fixture: ComponentFixture<Error.404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Error.404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error.404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
