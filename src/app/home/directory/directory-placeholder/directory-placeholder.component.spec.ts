import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryPlaceholderComponent } from './directory-placeholder.component';

describe('DirectoryPlaceholderComponent', () => {
  let component: DirectoryPlaceholderComponent;
  let fixture: ComponentFixture<DirectoryPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
