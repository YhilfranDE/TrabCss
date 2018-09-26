import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsAffiliationComponent } from './benefits-affiliation.component';

describe('BenefitsAffiliationComponent', () => {
  let component: BenefitsAffiliationComponent;
  let fixture: ComponentFixture<BenefitsAffiliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitsAffiliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
