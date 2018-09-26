import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPersonComponent } from './login-person.component';

describe('InicioSesionPersonaComponent', () => {

  let component: LoginPersonComponent;
  let fixture: ComponentFixture<LoginPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPersonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
