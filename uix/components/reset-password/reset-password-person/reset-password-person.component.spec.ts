import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordPersonComponent } from './reset-password-person.component';

describe('ResetPasswordPersonComponent', () => {
  let component: ResetPasswordPersonComponent;
  let fixture: ComponentFixture<ResetPasswordPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
