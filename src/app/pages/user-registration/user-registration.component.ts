import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lo-user-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {

  public userRegistrationForm!: FormGroup;

  public hidePassword: boolean = true;

  public messagePatternErrorPassword: string = 'A senha deve ter entre 8 e 80 caracteres.';
  public messagePatternErrorEmail: string = 'Digite um e-mail válido no formato "exemplo@dominio.com" sem ultrapassar 254 caracteres.';
  public messagePatternErrorUserName: string = 'O nome de usuário deve ter entre 3 e 30 caracteres, começar com uma letra e conter apenas letras e números (sem espaços ou símbolos).';

  private patternPassword: RegExp = /^.{8,80}$/;
  private patternUserName: RegExp = /^[A-Za-z][A-Za-z0-9]{2,29}$/;
  private patternEmail: RegExp = /^(?=.{1,254}$)[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.userRegistrationForm = this.buildUserRegistrationForm();
  }

  public register(): void { }

  public cancel(): void {
    this.router.navigate(['/login']);
  }

  private buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
        userName: ['', [Validators.required, Validators.pattern(this.patternUserName)]],
        password: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
      }
    );
  }

}
