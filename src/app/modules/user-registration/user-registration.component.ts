import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LockOutline, MailOutline, UserOutline } from '@ant-design/icons-angular/icons';

import { NzIconService } from 'ng-zorro-antd/icon';

import { NgZorroModules } from '../../shared/ng-zorro-modules';

@Component({
  selector: 'lo-user-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    NgZorroModules
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {

  public userRegistrationForm!: FormGroup;
  public passwordVisible!: boolean;
  public emailMaxLength: number = 255;
  public passwordMinLength: number = 8;
  public passwordMaxLength: number = 80;

  private userNamePattern: RegExp = /^(?!.*\s)(?!.*[._-]{2})(?![._-])[A-Za-z0-9._-]{3,30}(?<![._-])$/;
  private emailPattern: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly nzIconService: NzIconService
  ) {
    this.nzIconService.addIcon(LockOutline, MailOutline, UserOutline);
  }

  public ngOnInit(): void {
    this.userRegistrationForm = this.buildForm();
  }

  public register(): void { }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      userName: ['', [
        Validators.required,
        Validators.pattern(this.userNamePattern)]
      ],
      email: ['', [
        Validators.required,
        Validators.maxLength(this.emailMaxLength),
        Validators.pattern(this.emailPattern)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength)]
      ]
    });
  }

}
