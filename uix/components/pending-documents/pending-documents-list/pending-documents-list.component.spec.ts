import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDocumentsListComponent } from './pending-documents-list.component';

describe('PendingDocumentsListComponent', () => {
  let component: PendingDocumentsListComponent;
  let fixture: ComponentFixture<PendingDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
