import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    const gatewaySpy = jasmine.createSpyObj('UserGatewayService', ['createUser']);

    await TestBed.configureTestingModule({
      imports: [
        UserRegistrationComponent,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário no ngOnInit', () => {
    expect(component.userRegistrationForm).toBeTruthy();
    expect(component.userRegistrationForm.contains('userName')).toBeTrue();
    expect(component.userRegistrationForm.contains('email')).toBeTrue();
    expect(component.userRegistrationForm.contains('password')).toBeTrue();
  });

  describe('Validação dos campos do formulário de cadastro de usuário', () => {

    it('userName deve ser inválido quando vazio', () => {
      const control = component.userRegistrationForm.get('userName');
      control?.setValue('');
      expect(control?.valid).toBeFalse();
    });

    it('userName deve ser inválido quando contém espaços', () => {
      const control = component.userRegistrationForm.get('userName');
      control?.setValue('user name');
      expect(control?.valid).toBeFalse();
    });

    it('userName deve ser inválido quando tem menos de 3 caracteres', () => {
      const control = component.userRegistrationForm.get('userName');
      control?.setValue('ab');
      expect(control?.valid).toBeFalse();
    });

    it('userName deve ser válido com valor alfanumérico entre 3 e 30 caracteres', () => {
      const control = component.userRegistrationForm.get('userName');
      control?.setValue('User123');
      expect(control?.valid).toBeTrue();
    });

    it('email deve ser inválido quando vazio', () => {
      const control = component.userRegistrationForm.get('email');
      control?.setValue('');
      expect(control?.valid).toBeFalse();
    });

    it('email deve ser inválido quando malformado', () => {
      const control = component.userRegistrationForm.get('email');
      control?.setValue('email-invalido');
      expect(control?.valid).toBeFalse();
    });

    it('email deve ser válido quando correto', () => {
      const control = component.userRegistrationForm.get('email');
      control?.setValue('teste@email.com');
      expect(control?.valid).toBeTrue();
    });

    it('password deve ser inválido quando vazio', () => {
      const control = component.userRegistrationForm.get('password');
      control?.setValue('');
      expect(control?.valid).toBeFalse();
    });

    it('password deve ser inválido quando tem menos de 8 caracteres', () => {
      const control = component.userRegistrationForm.get('password');
      control?.setValue('1234567');
      expect(control?.valid).toBeFalse();
    });

    it('password deve ser válido quando tem entre 8 e 80 caracteres', () => {
      const control = component.userRegistrationForm.get('password');
      control?.setValue('12345678');
      expect(control?.valid).toBeTrue();
    });
  });
});
