import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConversationsComponent } from './admin-conversations.component';

describe('AdminConversationsComponent', () => {
  let component: AdminConversationsComponent;
  let fixture: ComponentFixture<AdminConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AdminConversationsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
