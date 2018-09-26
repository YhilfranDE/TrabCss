import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinicioContraseniaEmpresaComponent } from './reset-password-organization.component';

describe('ReinicioContraseniaEmpresaComponent', () => {
  let component: ReinicioContraseniaEmpresaComponent;
  let fixture: ComponentFixture<ReinicioContraseniaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinicioContraseniaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinicioContraseniaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
