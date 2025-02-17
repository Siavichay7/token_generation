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
  async obtenerTokens(): Promise<any[]> {
    return this.tokenService.obtenerTokens();
  }
}
