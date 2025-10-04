import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './acl/service/login.service';
import { LoginResponseDto } from './acl/model/dto/login-response-dto.model';
import { MessageService } from '../../shared/services/message/message.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let routerSpy: jasmine.SpyObj<Router>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    loginServiceSpy = jasmine.createSpyObj<LoginService>('LoginService', ['login']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['showMessage']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,

        LoginComponent,
      ]
    }).overrideComponent(LoginComponent, {
      set: {
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: LoginService, useValue: loginServiceSpy },
          { provide: MessageService, useValue: messageServiceSpy },
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de login na inicialização do componente de login', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('deve chamar o serviço de login e mostrar a mensagem de sucesso', () => {

    const loginResponseDto: LoginResponseDto = { message: 'Login realizado com sucesso!', expires_in: 123, access_token: 'abcd' };

    loginServiceSpy.login.and.returnValue(of(loginResponseDto));
    component.loginForm.setValue({ email: 'admin@email.com', password: 'password123456' });
    component.login();
    expect(loginServiceSpy.login).toHaveBeenCalledWith('admin@email.com', 'password123456');
    expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Login realizado com sucesso!', 'success');
  });

  it('deve tratar erro na chamada do serviço de login', () => {
    loginServiceSpy.login.and.returnValue(throwError(() => new Error('Ocorreu um erro inesperado, tente novamente.')));
    component.loginForm.setValue({ email: 'admin@email.com', password: 'password123456' });
    component.login();
    expect(loginServiceSpy.login).toHaveBeenCalledWith('admin@email.com', 'password123456');
  });

  it('deve chamar a rota de cadastro de usuário', () => {
    component.goToUserRegistration();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/register']);
  });
});
