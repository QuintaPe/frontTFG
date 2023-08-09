import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingViewComponent } from './camping-view.component';

describe('CampingViewComponent', () => {
  let component: CampingViewComponent;
  let fixture: ComponentFixture<CampingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
