import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../../environments/environment.development';
import { UserCreateRequestDTO } from '../dto/user-create/user-create-request.dto';
import { UserCreateResponseDTO } from '../dto/user-create/user-create-response.dto';
import { UserProxyService } from './user-proxy.service';

describe('UserProxyService', () => {
  let service: UserProxyService;
  let httpTestingController: HttpTestingController;

  const LOCAL_API_URL = `${environment.local_api_path}/user`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProxyService]
    });

    service = TestBed.inject(UserProxyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve criar a service', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar o método POST para a URL "/user" e retornar um UserCreateResponseDTO em caso de sucesso', () => {
    const requestDTO: UserCreateRequestDTO = {
      userName: 'user',
      email: 'user@email.com',
      password: '123456'
    };

    const responseDTO: UserCreateResponseDTO = {
      accessToken: 'jwt-token'
    };

    service.createUser(requestDTO).subscribe({
      next: (response) => {
        expect(response).toEqual(responseDTO);
      }
    });

    const req = httpTestingController.expectOne(LOCAL_API_URL);

    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe('http://localhost:8080/user');
    expect(req.request.body).toEqual(requestDTO);

    req.flush(responseDTO);
  });

  it('deve propagar um HttpErrorResponse quando a API retornar erro', () => {
    const requestDTO: UserCreateRequestDTO = {
      userName: 'admin',
      email: 'admin@email.com',
      password: '123456'
    };

    service.createUser(requestDTO).subscribe({
      error: (error: HttpErrorResponse) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(400);
        expect(error.error).toEqual({ message: 'Ocorreu um erro.' });
      }
    });

    const req = httpTestingController.expectOne(LOCAL_API_URL);

    req.flush(
      { message: 'Ocorreu um erro.' },
      { status: 400, statusText: 'Bad Request' }
    );
  });
});
