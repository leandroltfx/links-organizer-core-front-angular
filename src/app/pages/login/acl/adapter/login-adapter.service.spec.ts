import { TestBed } from '@angular/core/testing';

import { LoginAdapterService } from './login-adapter.service';

describe('LoginAdapterService', () => {
  let service: LoginAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginAdapterService
      ]
    });
    service = TestBed.inject(LoginAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve converter dados do formulário de login para contrato de requisição', () => {
    const email = 'admin@email.com';
    const password = 'password123';
    const result = service.toRequestContract(email, password);
    expect(result).toEqual({ email, password });
  });

  it('deve conveter contrato de resposta para dto', () => {
    const contract = { message: 'Login realizado com sucesso!', token: 'token' };
    const result = service.toDto(contract);
    expect(result).toEqual({ message: 'Login realizado com sucesso!', token: 'token' });
  });
});
