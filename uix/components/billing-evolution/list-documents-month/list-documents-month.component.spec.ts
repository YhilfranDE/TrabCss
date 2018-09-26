import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentsMonthComponent } from './list-documents-month.component';

describe('ListDocumentsMonthComponent', () => {
  let component: ListDocumentsMonthComponent ;
  let fixture: ComponentFixture<ListDocumentsMonthComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDocumentsMonthComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocumentsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
