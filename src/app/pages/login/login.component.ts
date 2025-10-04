import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginService } from './acl/service/login.service';
import { LoginProxyService } from './acl/proxy/login-proxy.service';
import { LoginErrorDto } from './acl/model/dto/login-error-dto.model';
import { LoginAdapterService } from './acl/adapter/login-adapter.service';
import { LoginResponseDto } from './acl/model/dto/login-response-dto.model';
import { MessageService } from '../../shared/services/message/message.service';

@Component({
  selector: 'lo-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [
    LoginService,
    LoginProxyService,
    LoginAdapterService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public hidePassword: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value,
      ).subscribe(
        {
          next: (response: LoginResponseDto) => {
            this.messageService.showMessage(response.message, 'success');
            this.router.navigate(['/home/collections']);
          },
          error: (error: LoginErrorDto) => this.messageService.showMessage(error.message, 'error'),
        }
      );
    }
  }

  public goToUserRegistration(): void {
    this.router.navigate(['/register']);
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
