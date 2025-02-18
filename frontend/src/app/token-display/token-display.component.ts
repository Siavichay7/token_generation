import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { UserSelectorComponent } from '../user-selector/user-selector.component';

@Component({
  selector: 'app-token-display',
  standalone: true,
  imports: [CommonModule, UserSelectorComponent],
  template: `
    <div class="token-display">
      <h2>Token Virtual</h2>
      <app-user-selector></app-user-selector>
      <p>Token: {{ token }}</p>
      <p>Tiempo restante: {{ tiempoRestante }} segundos</p>
      <button (click)="generarNuevoToken()" [disabled]="!currentUser">
        Generar Nuevo Token
      </button>
    </div>
  `,
  styleUrls: ['./token-display.component.scss'],
})
export class TokenDisplayComponent implements OnInit, OnDestroy {
  token: string = '';
  tiempoRestante: number = 60;
  private intervalId?: any;
  currentUser: string = '';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.generarNuevoToken();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  generarNuevoToken(): void {
    if (!this.currentUser) return;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    this.tokenService.generarToken(this.currentUser).subscribe({
      next: (tokenValue: string) => {
        this.token = tokenValue;
        this.tiempoRestante = 60;
        this.iniciarTemporizador();
      },
      error: (error) => {
        console.error('Error al generar token:', error);
      }
    });
  }

  iniciarTemporizador(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    this.intervalId = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        this.generarNuevoToken();
      }
    }, 1000);
  }
}
