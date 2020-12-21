import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryByCityComponent } from './directory-by-city.component';

describe('DirectoryByCityComponent', () => {
  let component: DirectoryByCityComponent;
  let fixture: ComponentFixture<DirectoryByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryByCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
