import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifiedItemComponent } from './classified-item.component';

describe('ClassifiedItemComponent', () => {
  let component: ClassifiedItemComponent;
  let fixture: ComponentFixture<ClassifiedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassifiedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifiedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
