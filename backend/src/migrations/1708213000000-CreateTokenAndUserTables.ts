import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokenAndUserTables1708213000000 implements MigrationInterface {
    name = 'CreateTokenAndUserTables1708213000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crear tabla usuario
        await queryRunner.query(`
            CREATE TABLE "usuario" (
                "id" SERIAL NOT NULL,
                "nombre" character varying NOT NULL,
                "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_usuario" PRIMARY KEY ("id")
            )
        `);

        // Crear tabla token
        await queryRunner.query(`
            CREATE TABLE "token" (
                "id" SERIAL NOT NULL,
                "codigo" character varying NOT NULL,
                "usado" boolean NOT NULL DEFAULT false,
                "fechaGeneracion" TIMESTAMP NOT NULL DEFAULT now(),
                "fechaUso" TIMESTAMP,
                "usuarioId" integer,
                CONSTRAINT "PK_token" PRIMARY KEY ("id")
            )
        `);

        // Crear foreign key
        await queryRunner.query(`
            ALTER TABLE "token" 
            ADD CONSTRAINT "FK_token_usuario" 
            FOREIGN KEY ("usuarioId") 
            REFERENCES "usuario"("id") 
            ON DELETE NO ACTION 
            ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar foreign key
        await queryRunner.query(`
            ALTER TABLE "token" 
            DROP CONSTRAINT "FK_token_usuario"
        `);

        // Eliminar tablas
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }
} 