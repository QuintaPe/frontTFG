import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingSearcherComponent } from './camping-searcher.component';

describe('CampingSearcherComponent', () => {
  let component: CampingSearcherComponent;
  let fixture: ComponentFixture<CampingSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampingSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
