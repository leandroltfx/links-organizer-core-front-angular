import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginService } from './acl/service/login.service';
import { LoginProxyService } from './acl/proxy/login-proxy.service';
import { LoginAdapterService } from './acl/adapter/login-adapter.service';

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
    private readonly formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  public login(): void { }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: '',
      password: ''
    });
  }

}
