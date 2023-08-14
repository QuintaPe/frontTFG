import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConversationComponent } from './user-conversation.component';

describe('UserConversationComponent', () => {
  let component: UserConversationComponent;
  let fixture: ComponentFixture<UserConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UserConversationComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
