import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAttentionComponent } from './contacts-attention.component';

describe('ContactsAttentionComponent', () => {
  let component: ContactsAttentionComponent;
  let fixture: ComponentFixture<ContactsAttentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsAttentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
