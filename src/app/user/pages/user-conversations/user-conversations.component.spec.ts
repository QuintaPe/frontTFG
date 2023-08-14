import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConversationsComponent } from './user-conversations.component';

describe('UserConversationsComponent', () => {
  let component: UserConversationsComponent;
  let fixture: ComponentFixture<UserConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UserConversationsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
