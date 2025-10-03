import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { UserRegistrationErrorDto } from '../model/dto/user-registration-error-dto.model';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';
import { UserRegistrationResponseDto } from '../model/dto/user-registration-response-dto.model';
import { UserRegistrationResponseContract } from '../model/contracts/response/user-registration-response-contract.model';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let userRegistrationProxyServiceSpy: jasmine.SpyObj<UserRegistrationProxyService>;
  let userRegistrationAdapterServiceSpy: jasmine.SpyObj<UserRegistrationAdapterService>;

  beforeEach(() => {
    userRegistrationProxyServiceSpy = jasmine.createSpyObj<UserRegistrationProxyService>('UserRegistrationProxyService', ['registerUser']);
    userRegistrationAdapterServiceSpy = jasmine.createSpyObj<UserRegistrationAdapterService>('UserRegistrationAdapterService', ['toRequestContract', 'toDto', 'toErrorDto']);

    TestBed.configureTestingModule({
      providers: [
        UserRegistrationService,
        { provide: UserRegistrationProxyService, useValue: userRegistrationProxyServiceSpy },
        { provide: UserRegistrationAdapterService, useValue: userRegistrationAdapterServiceSpy },
      ]
    });
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar o serviço de cadastro de usuário via proxy e tratar a requisição e resposta com o adapter', (done) => {
    const userName = 'userName';
    const email = 'admin@email.com';
    const password = 'password123';
    const requestContract = { userName, email, password };
    const responseContract: UserRegistrationResponseContract = { token: 'token' } as any;
    const responseDto: UserRegistrationResponseDto = { token: 'token' } as any;

    userRegistrationAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
    userRegistrationProxyServiceSpy.registerUser.and.returnValue(of(responseContract));
    userRegistrationAdapterServiceSpy.toDto.and.returnValue(responseDto);

    service.registerUser(userName, email, password).subscribe(result => {
      expect(userRegistrationAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(userName, email, password);
      expect(userRegistrationProxyServiceSpy.registerUser).toHaveBeenCalledWith(requestContract);
      expect(userRegistrationAdapterServiceSpy.toDto).toHaveBeenCalledWith(responseContract);
      expect(result).toEqual(responseDto);
      done();
    });
  });

  it('deve tratar erro na requisição do cadastro de usuário', (done) => {
    const userName = 'userName';
    const email = 'admin@email.com';
    const password = 'password123';
    const requestContract = { userName, email, password };
    const userRegistrationErrorDto: UserRegistrationErrorDto = { message: 'Ocorreu um erro inesperado.' };

    userRegistrationAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
    userRegistrationProxyServiceSpy.registerUser.and.returnValue(throwError(() => new HttpErrorResponse({
      error: userRegistrationErrorDto,
      status: 400,
      statusText: 'Bad Request'
    })));

    userRegistrationAdapterServiceSpy.toErrorDto.and.returnValue(userRegistrationErrorDto);

    service.registerUser(userName, email, password).subscribe({
      next: () => { },
      error: (err) => {
        expect(err.message).toBe('Ocorreu um erro inesperado.');
        done();
      }
    });
  });
});
