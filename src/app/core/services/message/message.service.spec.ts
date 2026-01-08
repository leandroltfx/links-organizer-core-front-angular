import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('MessageService', () => {
  let service: MessageService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {

    matSnackBarSpy = jasmine.createSpyObj<MatSnackBar>(['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Disparo de mensagem', () => {

    it('deve disparar uma mensagem de sucesso', () => {

      service.showMessage('mensagem', 'success');

      expect(matSnackBarSpy.open).toHaveBeenCalledWith(
        'mensagem',
        '',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'lo-success-message'
        }
      );
    });

    it('deve disparar uma mensagem de erro', () => {

      service.showMessage('mensagem', 'error');

      expect(matSnackBarSpy.open).toHaveBeenCalledWith(
        'mensagem',
        '',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'lo-error-message'
        }
      );
    });

    it('deve disparar uma mensagem de alerta', () => {

      service.showMessage('mensagem', 'warning');

      expect(matSnackBarSpy.open).toHaveBeenCalledWith(
        'mensagem',
        '',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'lo-warning-message'
        }
      );
    });

  });
});
