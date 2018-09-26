import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresPagoComponent } from './lugares-pago.component';

describe('LugaresPagoComponent', () => {
  let component: LugaresPagoComponent;
  let fixture: ComponentFixture<LugaresPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugaresPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugaresPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
