import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'lo-home',
  standalone: true,
  imports: [
    RouterOutlet,

    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private readonly router: Router
  ) { }

  public changeView(event: MatButtonToggleChange): void {
    const view = event.value;
    this.router.navigate([`/home/${view}`]);
  }

}
