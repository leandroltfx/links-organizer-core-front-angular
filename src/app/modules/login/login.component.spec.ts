import { Router, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NgZorroModules } from '../../shared/ng-zorro-modules';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,

        LoginComponent,
        NgZorroModules
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {

    it('deve iniciar o componente construíndo o formulário de login', () => {

      component.ngOnInit();

      expect(Object.keys(component.loginForm.controls).length).toBe(2);
      for (const key in component.loginForm.controls) {
        expect(key === 'email' || key === 'password');
      }
    });

  });

  describe('goToUserRegistration', () => {

    it('deve chamar a rota de cadastro de usuário', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.goToUserRegistration();

      expect(navigateSpy).toHaveBeenCalledWith(['/cadastro']);
    });

  });
});
