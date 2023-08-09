import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingsFavoritesComponent } from './campings-favorites.component';

describe('CampingsFavoritesComponent', () => {
  let component: CampingsFavoritesComponent;
  let fixture: ComponentFixture<CampingsFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingsFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
