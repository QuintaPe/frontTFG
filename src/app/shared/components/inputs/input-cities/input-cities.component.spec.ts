import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCitiesComponent } from './input-cities.component';

describe('InputCitiesComponent', () => {
  let component: InputCitiesComponent;
  let fixture: ComponentFixture<InputCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
