import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserAdapterService } from '../adapter/user-adapter.service';
import { UserCreateRequestDTO } from '../dto/user-create/user-create-request.dto';
import { UserCreateResponseDTO } from '../dto/user-create/user-create-response.dto';
import { UserCreateModel } from '../model/user-create/user-create.model';
import { UserProxyService } from '../proxy/user-proxy.service';
import { UserGatewayService } from './user-gateway.service';

describe('UserGatewayService', () => {
  let service: UserGatewayService;
  let userProxyService: jasmine.SpyObj<UserProxyService>;
  let userAdapterService: jasmine.SpyObj<UserAdapterService>;

  beforeEach(() => {
    const proxySpy = jasmine.createSpyObj('UserProxyService', ['createUser']);
    const adapterSpy = jasmine.createSpyObj('UserAdapterService', [
      'toUserCreateRequestDTO',
      'toUserCreateModel'
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserGatewayService,
        { provide: UserProxyService, useValue: proxySpy },
        { provide: UserAdapterService, useValue: adapterSpy }
      ]
    });

    service = TestBed.inject(UserGatewayService);
    userProxyService = TestBed.inject(
      UserProxyService
    ) as jasmine.SpyObj<UserProxyService>;
    userAdapterService = TestBed.inject(
      UserAdapterService
    ) as jasmine.SpyObj<UserAdapterService>;
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve criar usuário e retornar UserCreateModel em caso de sucesso', () => {
    const userName = 'user';
    const email = 'user@email.com';
    const password = '123456';

    const requestDTO: UserCreateRequestDTO = {
      userName,
      email,
      password
    };

    const responseDTO: UserCreateResponseDTO = {
      accessToken: 'jwt-token'
    };

    const model: UserCreateModel = {
      accessToken: 'jwt-token'
    };

    userAdapterService.toUserCreateRequestDTO.and.returnValue(requestDTO);
    userProxyService.createUser.and.returnValue(of(responseDTO));
    userAdapterService.toUserCreateModel.and.returnValue(model);

    service.createUser(userName, email, password).subscribe({
      next: (result) => {
        expect(result).toEqual(model);
      }
    });

    expect(userAdapterService.toUserCreateRequestDTO).toHaveBeenCalledWith(userName, email, password);
    expect(userProxyService.createUser).toHaveBeenCalledWith(requestDTO);
    expect(userAdapterService.toUserCreateModel).toHaveBeenCalledWith(responseDTO);
  });

  it('deve propagar HttpErrorResponse quando o proxy retornar erro', () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error'
    });

    userAdapterService.toUserCreateRequestDTO.and.returnValue({
      userName: 'user',
      email: 'user@email.com',
      password: '123456'
    });

    userProxyService.createUser.and.returnValue(
      throwError(() => errorResponse)
    );

    service.createUser('user', 'user@email.com', '123456')
      .subscribe({
        error: (error) => {
          expect(error).toBe(errorResponse);
          expect(error.status).toBe(500);
        }
      });
  });
});
