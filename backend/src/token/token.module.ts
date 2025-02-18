import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { Token } from './entity/token.entity';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    UsuarioModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {} 