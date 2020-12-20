import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByCityComponent } from './list-by-city.component';

describe('ListByCityComponent', () => {
  let component: ListByCityComponent;
  let fixture: ComponentFixture<ListByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
