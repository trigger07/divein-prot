# DiveIn - Backend (Server)

Este directorio contiene el backend de la plataforma DiveIn, implementado con Node.js, Fastify y PostgreSQL.

## 🏗️ Arquitectura

El backend sigue una arquitectura modular basada en:

```
server/
├── config/                # Configuración de la aplicación
├── controllers/           # Controladores de rutas
├── plugins/               # Plugins de Fastify
├── schemas/               # Esquemas de validación JSON
├── models/                # Modelos de datos
├── routes/                # Definición de rutas
├── services/              # Lógica de negocio
├── utils/                 # Utilidades
├── prisma/                # Prisma ORM
│   ├── schema.prisma      # Definición del esquema de la base de datos
│   └── migrations/        # Migraciones de la base de datos
├── app.ts                 # Configuración de la aplicación
├── server.ts              # Punto de entrada
└── package.json           # Dependencias y scripts
```

## 🔧 Tecnologías Utilizadas

- **Runtime**: Node.js
- **Framework**: Fastify
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Autenticación**: JWT
- **Validación**: JSON Schema (integrado con Fastify)
- **Servicios externos**:
  - Supabase (almacenamiento de imágenes)
  - Stripe (procesamiento de pagos)
  - SendGrid (envío de emails)

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL (v14 o superior)
- Cuentas en servicios externos:
  - Supabase
  - Stripe
  - SendGrid

## ⚙️ Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` con las credenciales necesarias:
```
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/divein"

# JWT
JWT_SECRET="tu-secreto-jwt"
JWT_EXPIRES_IN="7d"

# Servicios externos
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_KEY="tu-clave-supabase"
STRIPE_SECRET_KEY="tu-clave-secreta-stripe"
STRIPE_WEBHOOK_SECRET="tu-secreto-webhook-stripe"
SENDGRID_API_KEY="tu-clave-api-sendgrid"
SENDGRID_FROM_EMAIL="noreply@divein.com"

# Servidor
PORT=3001
HOST="localhost"
NODE_ENV="development"
```

4. Configurar la base de datos:
```bash
# Generar migraciones de Prisma
npx prisma migrate dev --name init

# Generar cliente Prisma
npx prisma generate
```

## 🚀 Scripts Disponibles

- **Desarrollo**:
  ```bash
  npm run dev
  ```
  Inicia el servidor en modo desarrollo con hot-reload.

- **Compilación**:
  ```bash
  npm run build
  ```
  Compila el código TypeScript a JavaScript.

- **Producción**:
  ```bash
  npm start
  ```
  Inicia el servidor en modo producción.

- **Migraciones de base de datos**:
  ```bash
  npm run db:migrate
  ```
  Ejecuta las migraciones pendientes.

- **Reseteo de base de datos**:
  ```bash
  npm run db:reset
  ```
  Resetea la base de datos (¡cuidado en producción!).

- **Linting**:
  ```bash
  npm run lint
  ```
  Ejecuta ESLint para verificar el código.

- **Testing**:
  ```bash
  npm test
  ```
  Ejecuta los tests con Jest.

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/signup` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cierre de sesión

### Experiencias
- `GET /api/experiences` - Listar experiencias con filtros
- `GET /api/experiences/:id` - Obtener detalle de una experiencia
- `POST /api/experiences` - Crear nueva experiencia (requiere auth de anfitrión)
- `PUT /api/experiences/:id` - Actualizar experiencia (requiere auth de anfitrión)
- `DELETE /api/experiences/:id` - Desactivar experiencia (requiere auth de anfitrión)

### Reservas
- `POST /api/reservations` - Crear nueva reserva
- `GET /api/reservations` - Obtener reservas del usuario (viajero o anfitrión)
- `GET /api/reservations/:id` - Obtener detalle de una reserva
- `PUT /api/reservations/:id` - Actualizar estado de reserva

### Usuarios
- `GET /api/users/profile` - Obtener perfil del usuario
- `PUT /api/users/profile` - Actualizar perfil

### Anfitriones
- `GET /api/host/dashboard` - Obtener dashboard del anfitrión
- `GET /api/host/experiences` - Listar experiencias del anfitrión
- `GET /api/host/reservations` - Listar reservas de las experiencias del anfitrión

### Reseñas
- `POST /api/reviews` - Crear reseña
- `GET /api/experiences/:id/reviews` - Obtener reseñas de una experiencia

## 📦 Estructura de Datos

El esquema de la base de datos está definido en `prisma/schema.prisma` e incluye los siguientes modelos principales:

- **User**: Usuarios (viajeros y anfitriones)
- **Experience**: Experiencias ofrecidas por anfitriones
- **Reservation**: Reservas de experiencias
- **Review**: Reseñas de experiencias

## 🚢 Despliegue

### Despliegue en servidor propio

1. Compilar la aplicación:
```bash
npm run build
```

2. Configurar variables de entorno para producción.

3. Iniciar el servidor:
```bash
npm start
```

### Despliegue con Docker

1. Construir la imagen:
```bash
docker build -t divein-server .
```

2. Ejecutar el contenedor:
```bash
docker run -p 3001:3001 --env-file .env divein-server
```

## 🔍 Monitoreo y Logs

- Los logs se escriben en la consola y en archivos en el directorio `logs/`
- En producción, se recomienda usar un servicio de monitoreo como New Relic o Datadog

## 🧪 Testing

Ejecutar los tests:
```bash
npm test
```

Para tests específicos:
```bash
npm test -- --testPathPattern=auth
```

## 📝 Convenciones de Código

- Seguimos las convenciones de ESLint y Prettier configuradas
- Usamos TypeScript para tipo seguro
- Documentamos con JSDoc para mejor intellisense
