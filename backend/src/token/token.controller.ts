import { Controller, Get, Query } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('generarToken')
  async generarToken(@Query('cliente') cliente: string): Promise<string> {
    return this.tokenService.generarToken(cliente);
  }

  @Get('usarToken')
  async usarToken(
    @Query('cliente') cliente: string,
    @Query('token') token: string,
  ): Promise<boolean> {
    return this.tokenService.usarToken(cliente, token);
  }

  @Get('tokens')
  async obtenerTokens() {
    try {
      const tokens = await this.tokenService.obtenerTokens();
      return tokens.map((token) => ({
        id: token.id,
        codigo: token.codigo,
        usado: token.usado,
        fechaGeneracion: token.fechaGeneracion,
        fechaUso: token.fechaUso,
        usuario: {
          id: token.usuario.id,
          nombre: token.usuario.nombre,
          fechaCreacion: token.usuario.fechaCreacion,
        },
      }));
    } catch (error) {
      console.error('Error al obtener tokens:', error);
      throw error;
    }
  }
}