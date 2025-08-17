import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LockOutline, MailOutline } from '@ant-design/icons-angular/icons';

import { NzIconService } from 'ng-zorro-antd/icon';

import { NgZorroModules } from '../../shared/ng-zorro-modules';

@Component({
  selector: 'lo-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    NgZorroModules
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public passwordVisible!: boolean;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly nzIconService: NzIconService
  ) {
    this.nzIconService.addIcon(LockOutline, MailOutline);
  }

  public ngOnInit(): void {
    this.loginForm = this.buildForm();
  }

  public login(): void { }

  public goToUserRegistration(): void {
    this.router.navigate(['/cadastro']);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
