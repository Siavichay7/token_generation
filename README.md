# Sistema de Generación de Tokens

Sistema de generación y gestión de tokens temporales con múltiples usuarios.

## Características Principales

- Generación automática de tokens
- Tokens con tiempo de expiración (60 segundos)
- Soporte para múltiples usuarios
- Historial de tokens generados
- Sistema de uso de tokens
- Persistencia de datos
- Interfaz responsive

## Stack Tecnológico

### Backend

- **Framework**: NestJS v10.4
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM v0.3
- **Características**:
  - Arquitectura modular
  - Inyección de dependencias
  - Decoradores para endpoints
  - Entidades tipadas
  - Migraciones de base de datos

### Frontend

- **Framework**: Angular v17
- **Características**:
  - Componentes standalone
  - Signals para estado
  - Server-Side Rendering (SSR)
  - Observables (RxJS)
  - Manejo de estado con BehaviorSubject
  - LocalStorage para persistencia de usuario

## Estructura del Proyecto 
proyecto/
├── backend/
│ ├── src/
│ │ ├── token/
│ │ │ ├── entity/
│ │ │ ├── token.controller.ts
│ │ │ ├── token.service.ts
│ │ │ └── token.module.ts
│ │ ├── usuario/
│ │ │ ├── entity/
│ │ │ ├── usuario.service.ts
│ │ │ └── usuario.module.ts
│ │ └── app.module.ts
│ └── package.json
└── frontend/
├── src/
│ ├── app/
│ │ ├── token-display/
│ │ ├── token-table/
│ │ ├── user-selector/
│ │ └── token.service.ts
│ └── main.ts
└── package.json