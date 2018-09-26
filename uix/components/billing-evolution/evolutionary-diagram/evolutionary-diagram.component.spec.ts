import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionaryDiagramComponent } from './evolutionary-diagram.component';

describe('DiagramaEvolutivoComponent', () => {
  let component: EvolutionaryDiagramComponent;
  let fixture: ComponentFixture<EvolutionaryDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionaryDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionaryDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
