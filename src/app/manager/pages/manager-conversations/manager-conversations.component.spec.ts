import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerConversationsComponent } from './manager-conversations.component';

describe('ManagerConversationsComponent', () => {
  let component: ManagerConversationsComponent;
  let fixture: ComponentFixture<ManagerConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ManagerConversationsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
