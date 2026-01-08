import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MessageTypes } from '../../../shared/types/message-types.type';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'center'; 
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'top';
  private readonly duration: number = 5000;
  private readonly panelClassesByMessageType = new Map<string, string>([
    ['success', 'lo-success-message'],
    ['error', 'lo-error-message'],
    ['warning', 'lo-warning-message']
  ]);

  constructor(
    private readonly matSnackBar: MatSnackBar
  ) { }

  public showMessage(
    message: string,
    type: MessageTypes,
  ): void {
    this.matSnackBar.open(
      message,
      '',
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.duration,
        panelClass: this.panelClassesByMessageType.get(type),
      }
    );
  }
}
