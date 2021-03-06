import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryHomeComponent } from './directory-home.component';

describe('DirectoryHomeComponent', () => {
  let component: DirectoryHomeComponent;
  let fixture: ComponentFixture<DirectoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
