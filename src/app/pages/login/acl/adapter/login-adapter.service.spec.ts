import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

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

  it('deve converter contrato de resposta para dto', () => {
    const contract = { message: 'Login realizado com sucesso!', token: 'token' };
    const result = service.toDto(contract);
    expect(result).toEqual({ message: 'Login realizado com sucesso!', token: 'token' });
  });

  it('deve converter um HttpErrorResponse em LoginErrorDto, preservando mensagem vinda do back', () => {
    const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { error: { message: 'Ocorreu um erro inesperado.' } } });
    const result = service.toErrorDto(httpErrorResponse);
    expect(result.message).toBe('Ocorreu um erro inesperado.');
  });

  it('deve converter um HttpErrorResponse em LoginErrorDto, colocando mensagem padrão em caso de não existência de mensagem', () => {
    const httpErrorResponse: HttpErrorResponse = new HttpErrorResponse({ error: { error: {} } });
    const result = service.toErrorDto(httpErrorResponse);
    expect(result.message).toBe('Ocorreu um erro inesperado, tente novamente.');
  });
});
