import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token/entity/token.entity';
import { TokenModule } from './token/token.module';
import { Usuario } from './usuario/entity/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Catalog',
      entities: [Token, Usuario],
      synchronize: false,
      logging: true,
    }),
    TokenModule,
    UsuarioModule,
  ],
})
export class AppModule {}
