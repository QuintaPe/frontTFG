import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingsListComponent } from './campings-list.component';

describe('CampingsListComponent', () => {
  let component: CampingsListComponent;
  let fixture: ComponentFixture<CampingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
