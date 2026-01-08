import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { UserGatewayService } from '../../core/api/endpoints/user/gateway/user-gateway.service';
import { UserRegistrationComponent } from './user-registration.component';
import { MessageService } from '../../core/services/message/message.service';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userGatewayService: jasmine.SpyObj<UserGatewayService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const gatewaySpy = jasmine.createSpyObj('UserGatewayService', ['createUser']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>(['showMessage']);

    await TestBed.configureTestingModule({
      imports: [
        UserRegistrationComponent,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: UserGatewayService, useValue: gatewaySpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    userGatewayService = TestBed.inject(
      UserGatewayService
    ) as jasmine.SpyObj<UserGatewayService>;

    fixture.detectChanges(); // dispara ngOnInit
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

  describe('registerUser', () => {

    it('não deve chamar o gateway quando o formulário for inválido', () => {
      component.userRegistrationForm.setValue({
        userName: '',
        email: '',
        password: ''
      });

      component.registerUser();

      expect(userGatewayService.createUser).not.toHaveBeenCalled();
    });

    it('deve chamar o gateway quando o formulário for válido e disparar uma mensagem de sucesso', () => {
      userGatewayService.createUser.and.returnValue(
        of({ accessToken: 'jwt-token' })
      );

      component.userRegistrationForm.setValue({
        userName: 'User123',
        email: 'teste@email.com',
        password: '12345678'
      });

      component.registerUser();

      expect(component.userRegistrationForm.valid).toBeTrue();
      expect(userGatewayService.createUser).toHaveBeenCalledWith(
        'User123',
        'teste@email.com',
        '12345678'
      );
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Usuário cadastrado com sucesso!', 'success');
    });

    it('deve tratar o erro quando o gateway retornar erro e disparar uma mensagem de erro', () => {
      const error = new Error('Erro ao registrar usuário');

      userGatewayService.createUser.and.returnValue(
        throwError(() => error)
      );

      component.userRegistrationForm.setValue({
        userName: 'User123',
        email: 'teste@email.com',
        password: '12345678'
      });

      component.registerUser();

      expect(userGatewayService.createUser).toHaveBeenCalled();
      expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Ocorreu um erro, tente novamente mais tarde.', 'error');
    });

  });
});
