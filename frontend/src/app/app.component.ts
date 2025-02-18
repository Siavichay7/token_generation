import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenDisplayComponent } from './token-display/token-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TokenDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}