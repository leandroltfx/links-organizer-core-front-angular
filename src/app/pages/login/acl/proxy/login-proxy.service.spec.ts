import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginProxyService } from './login-proxy.service';
import { LoginRequestContract } from '../model/contracts/request/login-request-contract.model';
import { LoginResponseContract } from '../model/contracts/response/login-response-contract.model';

describe('LoginProxyService', () => {
  let service: LoginProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginProxyService]
    });
    service = TestBed.inject(LoginProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer a requisição para o serviço de login utilizando o método HTTP POST', () => {
    const loginRequest: LoginRequestContract = { email: 'admin@email.com', password: 'abcd1234' };
    const loginResponse: LoginResponseContract = { token: 'abcd', message: 'Login realizado com sucesso!' };

    service.login(loginRequest).subscribe(response => {
      expect(response).toEqual(loginResponse);
    });

    const req = httpMock.expectOne('');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest);
    req.flush(loginResponse);
  });

  it('deve tratar o erro na requisição para o serviço de login', () => {
    const loginRequest: LoginRequestContract = { email: 'admin@email.com', password: 'abcd1234' };
    const errorMsg = 'Unauthorized';

    service.login(loginRequest).subscribe({
      next: () => { },
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    });

    const req = httpMock.expectOne('');
    req.flush(errorMsg, { status: 401, statusText: 'Unauthorized' });
  });
});
