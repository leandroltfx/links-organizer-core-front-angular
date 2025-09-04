import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { of, throwError } from 'rxjs';

import { LoginService } from './login.service';
import { LoginProxyService } from '../proxy/login-proxy.service';
import { LoginAdapterService } from '../adapter/login-adapter.service';
import { LoginResponseDto } from '../model/dto/login-response-dto.model';
import { LoginResponseContract } from '../model/contracts/response/login-response-contract.model';

describe('LoginService', () => {
  let service: LoginService;
  let loginProxyServiceSpy: jasmine.SpyObj<LoginProxyService>;
  let loginAdapterServiceSpy: jasmine.SpyObj<LoginAdapterService>;

  beforeEach(() => {
    loginProxyServiceSpy = jasmine.createSpyObj('LoginProxyService', ['login']);
    loginAdapterServiceSpy = jasmine.createSpyObj('LoginAdapterService', ['toRequestContract', 'toDto']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: LoginProxyService, useValue: loginProxyServiceSpy },
        { provide: LoginAdapterService, useValue: loginAdapterServiceSpy }
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar o serviço de login via proxy e tratar a requisição e resposta com o adapter', (done) => {
    const email = 'admin@email.com';
    const password = 'password123';
    const requestContract = { email, password };
    const responseContract: LoginResponseContract = { token: 'token' } as any;
    const responseDto: LoginResponseDto = { token: 'token' } as any;

    loginAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
    loginProxyServiceSpy.login.and.returnValue(of(responseContract));
    loginAdapterServiceSpy.toDto.and.returnValue(responseDto);

    service.login(email, password).subscribe(result => {
      expect(loginAdapterServiceSpy.toRequestContract).toHaveBeenCalledWith(email, password);
      expect(loginProxyServiceSpy.login).toHaveBeenCalledWith(requestContract);
      expect(loginAdapterServiceSpy.toDto).toHaveBeenCalledWith(responseContract);
      expect(result).toEqual(responseDto);
      done();
    });
  });

  it('deve tratar erro na requisição ', (done) => {
    const email = 'admin@email.com';
    const password = 'password123';
    const requestContract = { email, password };
    const httpError = new HttpErrorResponse({ error: 'Invalid', status: 401 });

    loginAdapterServiceSpy.toRequestContract.and.returnValue(requestContract);
    loginProxyServiceSpy.login.and.returnValue(throwError(() => httpError));

    service.login(email, password).subscribe({
      next: () => { },
      error: (err) => {
        expect(err).toBe(httpError);
        done();
      }
    });
  });
});
