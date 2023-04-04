import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingRowComponent } from './camping-row.component';

describe('CampingRowComponent', () => {
  let component: CampingRowComponent;
  let fixture: ComponentFixture<CampingRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
