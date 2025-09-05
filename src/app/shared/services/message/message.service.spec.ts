import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: MatSnackBar, useValue: matSnackBarSpy }
      ]
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar a mensagem do tipo success', () => {
    service.showMessage('Success message', 'success');

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      'Success message',
      '',
      jasmine.objectContaining({
        panelClass: 'message-success',
        duration: 500000000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    );
  });

  it('deve chamar a mensagem do tipo error', () => {
    service.showMessage('Error message', 'error');

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      'Error message',
      '',
      jasmine.objectContaining({
        panelClass: 'message-error',
        duration: 500000000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    );
  });

  it('deve chamar a mensagem do tipo warn', () => {
    service.showMessage('Warn message', 'warn');

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(
      'Warn message',
      '',
      jasmine.objectContaining({
        panelClass: 'message-warn',
        duration: 500000000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    );
  });
});
