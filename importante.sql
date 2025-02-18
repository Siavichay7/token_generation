-- Eliminar tablas si existen
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

-- Crear tabla usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    "fechaCreacion" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla token
CREATE TABLE token (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR NOT NULL,
    usado BOOLEAN NOT NULL DEFAULT FALSE,
    "fechaGeneracion" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaUso" TIMESTAMP,
    "usuarioId" INTEGER REFERENCES usuario(id)
);



select * from usuario

select * from Token