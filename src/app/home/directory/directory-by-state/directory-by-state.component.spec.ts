import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryByStateComponent } from './directory-by-state.component';

describe('DirectoryByStateComponent', () => {
  let component: DirectoryByStateComponent;
  let fixture: ComponentFixture<DirectoryByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryByStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
