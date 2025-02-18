import { DataSource } from 'typeorm';
import { CreateTokenAndUserTables1708213000000 } from './migrations/1708213000000-CreateTokenAndUserTables';
import { Token } from './token/entity/token.entity';
import { Usuario } from './usuario/entity/usuario.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'token_db',
    synchronize: false,
    logging: true,
    entities: [Token, Usuario],
    migrations: [CreateTokenAndUserTables1708213000000],
    subscribers: [],
}); 