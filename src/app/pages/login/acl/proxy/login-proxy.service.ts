import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { LoginRequestContract } from '../model/contracts/request/login-request-contract.model';
import { LoginResponseContract } from '../model/contracts/response/login-response-contract.model';

@Injectable()
export class LoginProxyService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public login(
    loginRequestContract: LoginRequestContract
  ): Observable<LoginResponseContract> {
    return this.httpClient.post<LoginResponseContract>(
      `${environment.mockoon_api_path}/login`,
      loginRequestContract
    ).pipe(
      map(
        (loginResponseContract: LoginResponseContract) => loginResponseContract
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)
      )
    );
  }

}
