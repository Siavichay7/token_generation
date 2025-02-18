import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Token, TokenService } from '../token.service';

@Component({
  selector: 'app-token-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.scss'],
})
export class TokenTableComponent implements OnInit {
  tokens: Token[] = [];
  filteredTokens: Token[] = [];
  filterCliente: string = '';
  filterUsado: string = '';
  currentUser: string = '';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    // Suscribirse al observable de tokens
    this.tokenService.tokens$.subscribe(tokens => {
      this.tokens = tokens;
      this.aplicarFiltros();
    });

    // Suscribirse al usuario actual
    this.tokenService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  aplicarFiltros(): void {
    this.filteredTokens = this.tokens.filter((token) => {
      const clienteMatch = token.usuario.nombre
        .toLowerCase()
        .includes(this.filterCliente.toLowerCase());
      const usadoMatch =
        this.filterUsado === '' ||
        token.usado === (this.filterUsado === 'true');
      return clienteMatch && usadoMatch;
    });
  }

  usarToken(token: Token): void {
    if (!token.usado && this.currentUser) {
      this.tokenService.usarToken(this.currentUser, token.codigo).subscribe({
        next: (success) => {
          if (success) {
            console.log('Token usado exitosamente');
          } else {
            console.error('No se pudo usar el token');
          }
        },
        error: (error) => {
          console.error('Error al usar el token:', error);
        }
      });
    }
  }

  puedeUsarToken(token: Token): boolean {
    return !token.usado && this.currentUser === token.usuario.nombre;
  }
}
