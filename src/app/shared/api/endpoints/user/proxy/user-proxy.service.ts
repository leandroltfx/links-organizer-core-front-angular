import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { UserCreateRequestDTO } from '../dto/user-create/user-create-request.dto';
import { UserCreateResponseDTO } from '../dto/user-create/user-create-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserProxyService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public createUser(
    userCreateRequestDTO: UserCreateRequestDTO
  ): Observable<UserCreateResponseDTO> {
    return this.httpClient.post<UserCreateResponseDTO>(
      `${environment.local_api_path}/user`,
      userCreateRequestDTO
    ).pipe(
      map((userCreateResponseDTO: UserCreateResponseDTO) => userCreateResponseDTO),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse))
    );
  }
}
