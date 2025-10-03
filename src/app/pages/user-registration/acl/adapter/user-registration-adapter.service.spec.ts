import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { UserRegistrationAdapterService } from './user-registration-adapter.service';

describe('UserRegistrationAdapterService', () => {
  let service: UserRegistrationAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRegistrationAdapterService
      ]
    });
    service = TestBed.inject(UserRegistrationAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve converter dados do formulário de login para contrato de requisição', () => {
    const userName = 'userName';
    const email = 'admin@email.com';
    const password = 'password123';
    const result = service.toRequestContract(userName, email, password);
    expect(result).toEqual({ userName, email, password });
  });

  it('deve converter contrato de resposta para dto', () => {
    const contract = { message: 'Cadastro realizado com sucesso!', access_token: 'token', expires_in: 12312312321 };
    const result = service.toDto(contract);
    expect(result).toEqual({ message: 'Cadastro realizado com sucesso!', access_token: 'token', expires_in: 12312312321 });
  });

  it('deve converter um HttpErrorResponse em UserRegistrationErrorDto, preservando mensagem vinda do back', () => {
    const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { error: { message: 'Ocorreu um erro inesperado.' } } });
    const result = service.toErrorDto(httpErrorResponse);
    expect(result.message).toBe('Ocorreu um erro inesperado.');
  });

  it('deve converter um HttpErrorResponse em UserRegistrationErrorDto, colocando mensagem padrão em caso de não existência de mensagem', () => {
    const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { error: {} } });
    const result = service.toErrorDto(httpErrorResponse);
    expect(result.message).toBe('Ocorreu um erro inesperado, tente novamente.');
  });
});
