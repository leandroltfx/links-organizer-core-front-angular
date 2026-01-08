import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserAdapterService } from '../adapter/user-adapter.service';
import { UserCreateResponseDTO } from '../dto/user-create/user-create-response.dto';
import { UserCreateModel } from '../model/user-create/user-create.model';
import { UserProxyService } from '../proxy/user-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class UserGatewayService {

  constructor(
    private readonly userProxyService: UserProxyService,
    private readonly userAdapterService: UserAdapterService,
  ) { }

  public createUser(
    userName: string,
    email: string,
    password: string,
  ): Observable<UserCreateModel> {
    return this.userProxyService.createUser(
      this.userAdapterService.toUserCreateRequestDTO(
        userName,
        email,
        password,
      )
    ).pipe(
      map((userCreateResponseDTO: UserCreateResponseDTO) => this.userAdapterService.toUserCreateModel(userCreateResponseDTO)),
      catchError((httpErrorResponse: HttpErrorResponse) => throwError(() => httpErrorResponse)),
    )
  }
}
