import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-token-table',
  standalone: true,
  imports: [],
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.css'],
})
export class TokenTableComponent implements OnInit {
  tokens: any[] = [];
  filteredTokens: any[] = [];
  filterCliente: string = '';
  filterUsado: string = '';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.cargarTokens();
  }

  cargarTokens(): void {
    this.tokenService.obtenerTokens().subscribe((tokens) => {
      this.tokens = tokens;
      this.filteredTokens = tokens;
    });
  }

  aplicarFiltros(): void {
    this.filteredTokens = this.tokens.filter((token) => {
      const clienteMatch = token.cliente
        .toLowerCase()
        .includes(this.filterCliente.toLowerCase());
      const usadoMatch =
        this.filterUsado === '' ||
        token.usado === (this.filterUsado === 'true');
      return clienteMatch && usadoMatch;
    });
  }
}
