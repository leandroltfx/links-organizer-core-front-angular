import { Injectable } from '@angular/core';
import { UserCreateRequestDTO } from '../dto/user-create/user-create-request.dto';
import { UserCreateModel } from '../model/user-create/user-create.model';
import { UserCreateResponseDTO } from '../dto/user-create/user-create-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserAdapterService {

  constructor() { }

  public toUserCreateRequestDTO(
    userName: string,
    email: string,
    password: string,
  ): UserCreateRequestDTO {
    return {
      userName,
      email,
      password,
    };
  }

  public toUserCreateModel(
    userCreateResponseDTO: UserCreateResponseDTO
  ): UserCreateModel {
    return {
      accessToken: userCreateResponseDTO.accessToken
    }
  }
}
