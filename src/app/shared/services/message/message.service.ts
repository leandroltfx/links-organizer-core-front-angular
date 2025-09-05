import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private classesByMessageType: Map<string, string> = new Map(
    [
      ['warn', 'message-warn'],
      ['error', 'message-error'],
      ['success', 'message-success'],
    ]
  );

  constructor(
    private readonly matSnackBar: MatSnackBar
  ) { }

  public showMessage(
    message: string,
    type: 'success' | 'error' | 'warn',
  ): void {
    this.matSnackBar.open(
      message,
      '',
      {
        panelClass: this.classesByMessageType.get(type),
        duration: 500000000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  }
}
