import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { LoginProxyService } from '../proxy/login-proxy.service';
import { LoginAdapterService } from '../adapter/login-adapter.service';
import { LoginResponseDto } from '../model/dto/login-response-dto.model';
import { LoginResponseContract } from '../model/contracts/response/login-response-contract.model';

@Injectable()
export class LoginService {

  constructor(
    private readonly loginProxyService: LoginProxyService,
    private readonly loginAdadpterService: LoginAdapterService,
  ) { }

  public login(
    email: string,
    password: string
  ): Observable<LoginResponseDto> {
    return this.loginProxyService.login(
      this.loginAdadpterService.toRequestContract(email, password)
    ).pipe(
      map(
        (loginResponseContract: LoginResponseContract) => this.loginAdadpterService.toDto(loginResponseContract)
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => throwError(() => this.loginAdadpterService.toErrorDto(httpErrorResponse))
      )
    );
  }
}
