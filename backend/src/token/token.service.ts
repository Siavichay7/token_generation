import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario/usuario.service';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private usuarioService: UsuarioService,
  ) {}

  async generarToken(nombreUsuario: string): Promise<string> {
    let usuario = await this.usuarioService.obtenerUsuarioPorNombre(nombreUsuario);
    if (!usuario) {
      usuario = await this.usuarioService.crearUsuario(nombreUsuario);
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const token = this.tokenRepository.create({
      codigo,
      usuario,
      fechaGeneracion: new Date(),
    });

    await this.tokenRepository.save(token);
    return codigo;
  }

  async usarToken(nombreUsuario: string, codigoToken: string): Promise<boolean> {
    const usuario = await this.usuarioService.obtenerUsuarioPorNombre(nombreUsuario);
    if (!usuario) {
      return false;
    }

    const token = await this.tokenRepository.findOne({
      where: { codigo: codigoToken, usuario: { id: usuario.id } },
      relations: ['usuario'],
    });

    if (token && !token.usado) {
      token.usado = true;
      token.fechaUso = new Date();
      await this.tokenRepository.save(token);
      return true;
    }

    return false;
  }

  async obtenerTokens() {
    try {
      this.logger.debug('Obteniendo tokens...');
      const tokens = await this.tokenRepository.find({
        relations: ['usuario'],
        order: {
          fechaGeneracion: 'DESC',
        },
      });
      this.logger.debug(`Se encontraron ${tokens.length} tokens`);
      return tokens;
    } catch (error) {
      this.logger.error('Error al obtener tokens:', error);
      throw error;
    }
  }
}