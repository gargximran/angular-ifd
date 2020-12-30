import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDirectoriesComponent } from './pending-directories.component';

describe('PendingDirectoriesComponent', () => {
  let component: PendingDirectoriesComponent;
  let fixture: ComponentFixture<PendingDirectoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDirectoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
