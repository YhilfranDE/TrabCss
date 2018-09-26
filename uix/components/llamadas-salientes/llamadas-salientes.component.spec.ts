import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadasSalientesComponent } from './llamadas-salientes.component';

describe('LlamadasSalientesComponent', () => {
  let component: LlamadasSalientesComponent;
  let fixture: ComponentFixture<LlamadasSalientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadasSalientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadasSalientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
