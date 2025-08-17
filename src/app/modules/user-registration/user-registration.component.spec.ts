import { Router, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgZorroModules } from '../../shared/ng-zorro-modules';
import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,

        NgZorroModules,
        UserRegistrationComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {

    it('deve iniciar o componente construíndo o formulário de cadastro de usuário', () => {

      component.ngOnInit();

      expect(Object.keys(component.userRegistrationForm.controls).length).toBe(3);
      for (const key in component.userRegistrationForm.controls) {
        expect(key === 'email' || key === 'password' || key === 'userName');
      }
    });

  });

  describe('goToLogin', () => {

    it('deve chamar a rota de login', () => {

      const navigateSpy = spyOn(router, 'navigate');

      component.goToLogin();

      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });

  });
});
