# DiveIn - Plataforma de Experiencias Turísticas Locales

DiveIn es una plataforma que conecta viajeros con anfitriones locales para experiencias turísticas auténticas. Permite a los viajeros explorar y reservar experiencias únicas, mientras que los anfitriones pueden crear y gestionar sus propias ofertas.

## 🌟 Características Principales

- Exploración de experiencias por ciudad, tipo, idioma, precio y fecha
- Reserva de experiencias con pago integrado
- Creación y gestión de experiencias para anfitriones
- Dashboard para anfitriones con estadísticas y gestión de reservas
- Sistema de autenticación para viajeros y anfitriones
- Soporte multilenguaje (Español, Inglés, Portugués)

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura de monorepo con los siguientes componentes:

```
divein/
├── web/                  # Aplicación web (Next.js)
├── mobile/               # Aplicación móvil (React Native + Expo)
├── server/               # Backend (Node.js + Fastify + PostgreSQL)
└── shared/               # Código compartido (tipos, utilidades, traducciones)
```

### Stack Tecnológico

#### Frontend Web (Next.js)
- TypeScript
- Tailwind CSS
- React Hook Form
- SWR/React Query
- i18next

#### Frontend Mobile (React Native + Expo)
- TypeScript
- NativeWind (Tailwind para React Native)
- React Navigation
- i18next

#### Backend (Node.js + Fastify)
- TypeScript
- PostgreSQL con Prisma ORM
- JWT para autenticación
- Supabase para almacenamiento
- Stripe para pagos
- SendGrid para emails

## 🚀 Primeros Pasos

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL
- Expo CLI (para desarrollo móvil)

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/divein.git
cd divein
```

2. Instalar dependencias para cada proyecto:

```bash
# Backend
cd server
npm install

# Frontend Web
cd ../web
npm install

# Frontend Mobile
cd ../mobile
npm install
```

3. Configurar variables de entorno:
   - Copiar los archivos `.env.example` a `.env` en cada directorio
   - Completar con las credenciales necesarias

## 🏃‍♂️ Ejecución del Proyecto

### Backend (server)

```bash
cd server
npm run dev
```
El servidor estará disponible en `http://localhost:3001`

### Frontend Web (web)

```bash
cd web
npm run dev
```
La aplicación web estará disponible en `http://localhost:3000`

### Frontend Mobile (mobile)

```bash
cd mobile
npm start
```
Seguir las instrucciones en consola para ejecutar en iOS, Android o web.

## 📚 Documentación

Para más información sobre cada componente, consulta los README específicos:

- [Backend (server)](./server/README.md)
- [Frontend Web (web)](./web/README.md)
- [Frontend Mobile (mobile)](./mobile/README.md)
- [Código Compartido (shared)](./shared/README.md)

## 🧪 Testing

Cada proyecto incluye sus propios tests:

```bash
# Ejecutar tests en backend
cd server
npm test

# Ejecutar tests en frontend web
cd web
npm test

# Ejecutar tests en frontend mobile
cd mobile
npm test
```

## 🌐 Despliegue

Consulta las guías específicas de despliegue en cada README:
- [Guía de Despliegue Backend](./server/README.md#despliegue)
- [Guía de Despliegue Web](./web/README.md#despliegue)
- [Guía de Despliegue Mobile](./mobile/README.md#despliegue)

## 📝 Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).
