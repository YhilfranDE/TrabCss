import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipReceiptDigitalComponent } from './membership-receipt-digital.component';

describe('MembershipReceiptDigitalComponent', () => {
  let component: MembershipReceiptDigitalComponent;
  let fixture: ComponentFixture<MembershipReceiptDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipReceiptDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipReceiptDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
