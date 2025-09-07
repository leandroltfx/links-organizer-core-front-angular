import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { UserRegistrationProxyService } from '../proxy/user-registration-proxy.service';
import { UserRegistrationAdapterService } from '../adapter/user-registration-adapter.service';
import { UserRegistrationResponseDto } from '../model/dto/user-registration-response-dto.model';
import { UserRegistrationResponseContract } from '../model/contracts/response/user-registration-response-contract.model';

@Injectable()
export class UserRegistrationService {

  constructor(
    private readonly userRegistrationProxyService: UserRegistrationProxyService,
    private readonly userRegistrationAdapterService: UserRegistrationAdapterService,
  ) { }

  public registerUser(
    userName: string,
    email: string,
    password: string,
  ): Observable<UserRegistrationResponseDto> {
    return this.userRegistrationProxyService.registerUser(
      this.userRegistrationAdapterService.toRequestContract(userName, email, password)
    ).pipe(
      map(
        (userRegistrationResponseContract: UserRegistrationResponseContract) => this.userRegistrationAdapterService.toDto(userRegistrationResponseContract)
      ),
      catchError(
        (httpErrorResponse: HttpErrorResponse) => throwError(() => this.userRegistrationAdapterService.toErrorDto(httpErrorResponse))
      ),
    );
  }
}
