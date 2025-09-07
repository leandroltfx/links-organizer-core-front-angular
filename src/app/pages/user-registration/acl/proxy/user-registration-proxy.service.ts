import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { UserRegistrationRequestContract } from '../model/contracts/request/user-registration-request-contract.model';
import { UserRegistrationResponseContract } from '../model/contracts/response/user-registration-response-contract.model';

@Injectable()
export class UserRegistrationProxyService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public registerUser(
    userRegistrationRequestContract: UserRegistrationRequestContract
  ): Observable<UserRegistrationResponseContract> {
    return this.httpClient.post<UserRegistrationResponseContract>(
      `${environment.mockoon_api_path}/user`,
      userRegistrationRequestContract
    ).pipe(
      map(
        (userRegistrationResponseContract: UserRegistrationResponseContract) => userRegistrationResponseContract
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)
      )
    );
  }
}
