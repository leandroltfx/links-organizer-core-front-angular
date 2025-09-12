import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoginErrorDto } from '../model/dto/login-error-dto.model';
import { LoginResponseDto } from '../model/dto/login-response-dto.model';
import { LoginRequestContract } from '../model/contracts/request/login-request-contract.model';
import { LoginResponseContract } from '../model/contracts/response/login-response-contract.model';

@Injectable()
export class LoginAdapterService {

  constructor() { }

  public toRequestContract(
    email: string,
    password: string
  ): LoginRequestContract {
    return {
      email,
      password
    }
  }

  public toDto(
    loginResponseContract: LoginResponseContract
  ): LoginResponseDto {
    return {
      message: loginResponseContract.message,
      token: loginResponseContract.token,
    }
  }

  public toErrorDto(
    httpErrorResponse: HttpErrorResponse
  ): LoginErrorDto {
    return {
      message: httpErrorResponse?.error?.error?.message ?? 'Ocorreu um erro inesperado, tente novamente.'
    }
  }
}
