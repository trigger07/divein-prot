# DiveIn - Frontend Web (Next.js)

Este directorio contiene la aplicación web de DiveIn, implementada con Next.js y TypeScript.

## 🏗️ Arquitectura

La aplicación web sigue la arquitectura de Next.js App Router con una estructura organizada:

```
web/
├── app/                      # App Router (Next.js 13+)
│   ├── (auth)/               # Grupo de rutas de autenticación
│   │   ├── login/
│   │   └── signup/
│   ├── experiences/          # Rutas de experiencias
│   │   ├── [id]/             # Detalle de experiencia
│   │   └── page.tsx          # Listado/búsqueda de experiencias
│   ├── host/                 # Rutas para anfitriones
│   │   ├── dashboard/
│   │   └── experiences/
│   ├── reservations/         # Gestión de reservas
│   ├── api/                  # API Routes
│   └── page.tsx              # Página principal
├── components/               # Componentes reutilizables
│   ├── ui/                   # Componentes de UI básicos
│   ├── forms/                # Componentes de formulario
│   ├── experiences/          # Componentes específicos de experiencias
│   └── layouts/              # Layouts reutilizables
├── hooks/                    # Custom hooks
├── lib/                      # Utilidades y configuraciones
│   ├── api.ts                # Cliente API
│   └── utils.ts              # Funciones de utilidad
├── public/                   # Archivos estáticos
├── locales/                  # Archivos de traducción
├── styles/                   # Estilos globales
├── types/                    # Definiciones de TypeScript
├── next.config.js            # Configuración de Next.js
├── tailwind.config.js        # Configuración de Tailwind CSS
└── package.json              # Dependencias y scripts
```

## 🔧 Tecnologías Utilizadas

- **Framework**: Next.js 14+
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gestión de Estado**: React Context + SWR/React Query
- **Formularios**: React Hook Form + Zod
- **Internacionalización**: i18next + next-i18next
- **Testing**: Jest + React Testing Library
- **Integración API**: Axios

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Backend de DiveIn en ejecución (o mocks configurados)

## ⚙️ Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

3. Editar el archivo `.env.local` con las configuraciones necesarias:
```
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Autenticación
NEXT_PUBLIC_AUTH_COOKIE_NAME=divein_token

# Servicios externos
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-supabase
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=tu-clave-publica-stripe

# Configuración de la aplicación
NEXT_PUBLIC_DEFAULT_LOCALE=es
```

## 🚀 Scripts Disponibles

- **Desarrollo**:
  ```bash
  npm run dev
  ```
  Inicia el servidor de desarrollo en `http://localhost:3000`.

- **Compilación**:
  ```bash
  npm run build
  ```
  Compila la aplicación para producción.

- **Producción**:
  ```bash
  npm start
  ```
  Inicia el servidor en modo producción.

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

- **Storybook** (si está configurado):
  ```bash
  npm run storybook
  ```
  Inicia Storybook para desarrollo de componentes.

## 🌐 Internacionalización (i18n)

La aplicación soporta múltiples idiomas:

- Español (es) - Idioma principal
- Inglés (en)
- Portugués (pt)

Los archivos de traducción se encuentran en el directorio `locales/` organizados por idioma y namespace:

```
locales/
├── es/
│   ├── common.json
│   ├── experiences.json
│   └── ...
├── en/
│   ├── common.json
│   ├── experiences.json
│   └── ...
└── pt/
    ├── common.json
    ├── experiences.json
    └── ...
```

Para añadir un nuevo idioma, crea un nuevo directorio con los archivos de traducción correspondientes.

## 🧩 Componentes Principales

### Páginas

- **Home**: Página principal con búsqueda y experiencias destacadas
- **Experiences**: Listado y búsqueda de experiencias
- **Experience Detail**: Detalle de una experiencia con calendario y reserva
- **Host Dashboard**: Panel de control para anfitriones
- **Reservations**: Gestión de reservas para viajeros y anfitriones

### Componentes Reutilizables

- **ExperienceCard**: Tarjeta para mostrar una experiencia
- **SearchFilters**: Filtros de búsqueda
- **Calendar**: Calendario para seleccionar fechas
- **ReviewList**: Lista de reseñas
- **ImageGallery**: Galería de imágenes
- **AuthForms**: Formularios de autenticación

## 🔌 Integración con API

La aplicación se comunica con el backend a través de un cliente API centralizado en `lib/api.ts`. Utilizamos SWR para la gestión de datos con caché y revalidación automática.

Ejemplo de uso:
```typescript
import { useExperience } from '@/hooks/api/useExperiences';

function ExperienceDetail({ id }) {
  const { data, error, isLoading } = useExperience(id);
  
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  
  return <ExperienceDetailView experience={data} />;
}
```

## 🎨 Diseño y Estilos

Utilizamos Tailwind CSS para los estilos con una configuración personalizada en `tailwind.config.js`:

- Paleta de colores personalizada para DiveIn
- Componentes estilizados consistentes
- Diseño responsive para todas las pantallas
- Modo oscuro (si está implementado)

## 🚢 Despliegue

### Despliegue en Vercel (recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Despliegue manual

1. Compilar la aplicación:
```bash
npm run build
```

2. Iniciar en producción:
```bash
npm start
```

### Despliegue con Docker

1. Construir la imagen:
```bash
docker build -t divein-web .
```

2. Ejecutar el contenedor:
```bash
docker run -p 3000:3000 --env-file .env.local divein-web
```

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
- Componentes funcionales con hooks
- Nombres de archivos en PascalCase para componentes
- Nombres de archivos en camelCase para utilidades y hooks
