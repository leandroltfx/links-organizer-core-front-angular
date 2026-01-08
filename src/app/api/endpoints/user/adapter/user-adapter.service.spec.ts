import { TestBed } from '@angular/core/testing';
import { UserCreateRequestDTO } from '../dto/user-create/user-create-request.dto';
import { UserCreateResponseDTO } from '../dto/user-create/user-create-response.dto';
import { UserCreateModel } from '../model/user-create/user-create.model';
import { UserAdapterService } from './user-adapter.service';

describe('UserAdapterService', () => {
  let service: UserAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAdapterService]
    });

    service = TestBed.inject(UserAdapterService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve converter dados do formulário de cadastro de usuário em UserCreateRequestDTO', () => {
    const userName = 'user';
    const email = 'user@email.com';
    const password = '123456';

    const expectedDTO: UserCreateRequestDTO = {
      userName,
      email,
      password
    };

    const result = service.toUserCreateRequestDTO(
      userName,
      email,
      password
    );

    expect(result).toEqual(expectedDTO);
  });

  it('deve converter UserCreateResponseDTO em UserCreateModel', () => {
    const responseDTO: UserCreateResponseDTO = {
      accessToken: 'jwt-token'
    };

    const expectedModel: UserCreateModel = {
      accessToken: 'jwt-token'
    };

    const result = service.toUserCreateModel(responseDTO);

    expect(result).toEqual(expectedModel);
  });
});
