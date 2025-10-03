import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserRegistrationProxyService } from './user-registration-proxy.service';
import { UserRegistrationRequestContract } from '../model/contracts/request/user-registration-request-contract.model';
import { UserRegistrationResponseContract } from '../model/contracts/response/user-registration-response-contract.model';

describe('UserRegistrationProxyService', () => {
  let service: UserRegistrationProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRegistrationProxyService],
    });
    service = TestBed.inject(UserRegistrationProxyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer a requisição para o serviço de cadastro de usuário utilizando o método HTTP POST', () => {
    const userRegistrationRequest: UserRegistrationRequestContract = { userName: 'userName', email: 'admin@email.com', password: 'abcd1234' };
    const userRegistrationResponse: UserRegistrationResponseContract = { expires_in: 123, access_token: 'abcd', message: 'Cadastro realizado com sucesso!' };

    service.registerUser(userRegistrationRequest).subscribe(response => {
      expect(response).toEqual(userRegistrationResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/user');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userRegistrationRequest);
    req.flush(userRegistrationResponse);
  });

  it('deve tratar o erro na requisição para o serviço de cadastro de usuário', () => {
    const userRegistrationRequest: UserRegistrationRequestContract = { userName: 'userName', email: 'admin@email.com', password: 'abcd1234' };
    const errorMsg = 'Unauthorized';

    service.registerUser(userRegistrationRequest).subscribe({
      next: () => { },
      error: (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Unauthorized');
      }
    });

    const req = httpMock.expectOne('http://localhost:8080/user');
    req.flush(errorMsg, { status: 401, statusText: 'Unauthorized' });
  });
});
