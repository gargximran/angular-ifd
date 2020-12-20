import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByStateComponent } from './list-by-state.component';

describe('ListByStateComponent', () => {
  let component: ListByStateComponent;
  let fixture: ComponentFixture<ListByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
