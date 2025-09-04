import { Injectable } from '@angular/core';

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
}
