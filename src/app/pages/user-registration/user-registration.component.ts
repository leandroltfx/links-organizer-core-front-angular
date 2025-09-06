import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
        userName: '',
        email: '',
        password: '',
      }
    );
  }

}
