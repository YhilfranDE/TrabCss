import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryMembershipComponent } from './registry-membership.component';

describe('RegistryMembershipComponent', () => {
  let component: RegistryMembershipComponent;
  let fixture: ComponentFixture<RegistryMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistryMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
