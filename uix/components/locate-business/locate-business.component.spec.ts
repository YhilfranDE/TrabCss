import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateBusinessComponent } from './locate-business.component';

describe('LocateBusinessComponent', () => {
  let component: LocateBusinessComponent;
  let fixture: ComponentFixture<LocateBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
