import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-token-display',
  standalone: true,
  imports: [],
  templateUrl: './token-display.component.html',
  styleUrls: ['./token-display.component.css'],
})
export class TokenDisplayComponent implements OnInit {
  token: string = '';
  tiempoRestante: number = 60;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.generarNuevoToken();
  }

  generarNuevoToken(): void {
    this.tokenService.generarToken('cliente1').subscribe((token) => {
      this.token = token;
      this.iniciarTemporizador();
    });
  }

  iniciarTemporizador(): void {
    const interval = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        clearInterval(interval);
        this.generarNuevoToken();
        this.tiempoRestante = 60;
      }
    }, 1000);
  }
}
