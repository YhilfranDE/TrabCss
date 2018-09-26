import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AffiliatedbusinessesComponent} from './affiliated-businesses.component';

describe('Affiliated-businesses', () => {
  let component: AffiliatedbusinessesComponent;
  let fixture: ComponentFixture<AffiliatedbusinessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliatedbusinessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatedbusinessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
