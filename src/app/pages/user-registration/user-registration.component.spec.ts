import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { of, throwError } from 'rxjs';

import { UserRegistrationComponent } from './user-registration.component';
import { MessageService } from '../../shared/services/message/message.service';
import { UserRegistrationService } from './acl/service/user-registration.service';
import { UserRegistrationResponseDto } from './acl/model/dto/user-registration-response-dto.model';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  let routerSpy: jasmine.SpyObj<Router>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let userRegistrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['showMessage']);
    userRegistrationServiceSpy = jasmine.createSpyObj<UserRegistrationService>('LoginService', ['registerUser']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,

        UserRegistrationComponent,
      ]
    }).overrideComponent(UserRegistrationComponent, {
      set: {
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: MessageService, useValue: messageServiceSpy },
          { provide: UserRegistrationService, useValue: userRegistrationServiceSpy },
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de login na inicialização do componente de login', () => {
    component.ngOnInit();
    expect(component.userRegistrationForm).toBeDefined();
    expect(component.userRegistrationForm.controls['userName']).toBeDefined();
    expect(component.userRegistrationForm.controls['email']).toBeDefined();
    expect(component.userRegistrationForm.controls['password']).toBeDefined();
  });

  it('deve chamar a rota de login ao cancelar cadastro de usuário', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve chamar o serviço de cadastro de usuário', () => {

    const userRegistrationResponseDto: UserRegistrationResponseDto = { message: 'Cadastro realizado com sucesso!', expires_in: 123, access_token: 'abcd' };

    userRegistrationServiceSpy.registerUser.and.returnValue(of(userRegistrationResponseDto));
    component.userRegistrationForm.setValue({ userName: 'userName', email: 'admin@email.com', password: 'password123456' });
    component.registerUser();
    expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('userName', 'admin@email.com', 'password123456');
    expect(messageServiceSpy.showMessage).toHaveBeenCalledWith('Cadastro realizado com sucesso!', 'success');
  });

  it('deve tratar erro na chamada do serviço de cadastro de usuário', () => {
    userRegistrationServiceSpy.registerUser.and.returnValue(throwError(() => new Error('Ocorreu um erro inesperado, tente novamente.')));
    component.userRegistrationForm.setValue({ userName: 'userName', email: 'admin@email.com', password: 'password123456' });
    component.registerUser();
    expect(userRegistrationServiceSpy.registerUser).toHaveBeenCalledWith('userName', 'admin@email.com', 'password123456');
  });
});
