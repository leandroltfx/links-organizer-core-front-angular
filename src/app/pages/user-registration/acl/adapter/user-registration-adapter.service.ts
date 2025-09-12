import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UserRegistrationErrorDto } from '../model/dto/user-registration-error-dto.model';
import { UserRegistrationResponseDto } from '../model/dto/user-registration-response-dto.model';
import { UserRegistrationRequestContract } from '../model/contracts/request/user-registration-request-contract.model';
import { UserRegistrationResponseContract } from '../model/contracts/response/user-registration-response-contract.model';

@Injectable()
export class UserRegistrationAdapterService {

  constructor() { }

  public toRequestContract(
    userName: string,
    email: string,
    password: string,
  ): UserRegistrationRequestContract {
    return {
      userName,
      email,
      password
    }
  }

  public toDto(
    userRegistrationResponseContract: UserRegistrationResponseContract
  ): UserRegistrationResponseDto {
    return {
      message: userRegistrationResponseContract.message,
      token: userRegistrationResponseContract.token,
    }
  }

  public toErrorDto(
    httpErrorResponse: HttpErrorResponse
  ): UserRegistrationErrorDto {
    return {
      message: httpErrorResponse?.error?.error?.message ?? 'Ocorreu um erro inesperado, tente novamente.'
    }
  }
}
