import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Token } from './token/entity/token.entity';
import { TokenController } from './token/token.controller';
import { TokenService } from './token/token.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'token_db',
      entities: [Token],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [AppController, TokenController],
  providers: [AppService, TokenService],
})
export class AppModule {}
