import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,

        UserRegistrationComponent,
      ]
    }).overrideComponent(UserRegistrationComponent, {
      set: {
        providers: [
          { provide: Router, useValue: routerSpy },
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário de login na inicialização do componente de login', () => {
    component.ngOnInit();
    expect(component.userRegistrationForm).toBeDefined();
    expect(component.userRegistrationForm.controls['userName']).toBeDefined();
    expect(component.userRegistrationForm.controls['email']).toBeDefined();
    expect(component.userRegistrationForm.controls['password']).toBeDefined();
  });

  it('deve chamar a rota de login ao cancelar cadastro de usuário', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
