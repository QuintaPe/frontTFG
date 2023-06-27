import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCampingsComponent } from './admin-campings.component';

describe('AdminCampingsComponent', () => {
  let component: AdminCampingsComponent;
  let fixture: ComponentFixture<AdminCampingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCampingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCampingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
