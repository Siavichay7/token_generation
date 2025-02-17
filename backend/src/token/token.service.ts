import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async generarToken(cliente: string): Promise<string> {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const nuevoToken = this.tokenRepository.create({
      cliente,
      token,
      usado: false,
      fechaGeneracion: new Date(),
    });
    await this.tokenRepository.save(nuevoToken);
    return token;
  }

  async usarToken(cliente: string, token: string): Promise<boolean> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { cliente, token },
    });
    if (tokenEntity && !tokenEntity.usado) {
      tokenEntity.usado = true;
      tokenEntity.fechaUso = new Date();
      await this.tokenRepository.save(tokenEntity);
      return true;
    }
    return false;
  }

  async obtenerTokens(): Promise<any[]> {
    return this.tokenRepository.find();
  }
}
