import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDocumentsListComponent } from './claim-documents-list.component';

describe('ClaimDocumentsListComponent', () => {
  let component: ClaimDocumentsListComponent;
  let fixture: ComponentFixture<ClaimDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
