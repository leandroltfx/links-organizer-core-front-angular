import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lo-user-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  public userRegistrationForm!: FormGroup;
  public emailFieldErrorMessage: string = 'E-mail inválido.';
  public userNameFieldErrorMessage: string = 'O nome de usuário deve conter entre 3 e 30 caracteres alfanuméricos e não deve ter espaços em branco.';
  public passwordErrorMessage: string = 'A senha deve conter entre 8 e 80 caracteres.';

  private patternUserName: RegExp = /^[A-Za-z0-9]{3,30}$/;
  private patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  private patternPassword: RegExp = /^.{8,80}$/;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  public hidePassword: boolean = true;

  public ngOnInit(): void {
    this.userRegistrationForm = this.buildUserRegistrationForm();
  }

  public registerUser(): void {
    if (this.userRegistrationForm.valid) {
      console.log('userRegistrationForm valid');
    }
  }

  private buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(this.patternUserName)]],
      email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      password: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
    });
  }

}
