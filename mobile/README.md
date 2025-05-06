# DiveIn - Frontend Mobile (React Native + Expo)

Este directorio contiene la aplicación móvil de DiveIn, implementada con React Native y Expo.

## 🏗️ Arquitectura

La aplicación móvil sigue una arquitectura basada en Expo Router con una estructura organizada:

```
mobile/
├── app/                      # Estructura de navegación (Expo Router)
│   ├── (auth)/               # Grupo de rutas de autenticación
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── experiences/          # Rutas de experiencias
│   │   ├── [id].tsx          # Detalle de experiencia
│   │   └── index.tsx         # Listado/búsqueda de experiencias
│   ├── host/                 # Rutas para anfitriones
│   │   ├── dashboard.tsx
│   │   └── experiences.tsx
│   ├── reservations/         # Gestión de reservas
│   │   ├── [id].tsx
│   │   └── index.tsx
│   ├── _layout.tsx           # Layout principal
│   └── index.tsx             # Pantalla principal
├── components/               # Componentes reutilizables
│   ├── ui/                   # Componentes de UI básicos
│   ├── forms/                # Componentes de formulario
│   ├── experiences/          # Componentes específicos de experiencias
│   └── layouts/              # Layouts reutilizables
├── hooks/                    # Custom hooks
├── services/                 # Servicios API
├── utils/                    # Funciones de utilidad
├── constants/                # Constantes y configuración
├── locales/                  # Archivos de traducción
├── types/                    # Definiciones de TypeScript
├── assets/                   # Imágenes, fuentes, etc.
├── app.json                  # Configuración de Expo
├── babel.config.js           # Configuración de Babel
└── package.json              # Dependencias y scripts
```

## 🔧 Tecnologías Utilizadas

- **Framework**: React Native
- **Plataforma**: Expo
- **Lenguaje**: TypeScript
- **Navegación**: Expo Router
- **Estilos**: NativeWind (Tailwind para React Native)
- **Gestión de Estado**: React Context + React Query
- **Formularios**: React Hook Form
- **Internacionalización**: i18next
- **Testing**: Jest + React Native Testing Library
- **Integración API**: Axios

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Backend de DiveIn en ejecución (o mocks configurados)
- Para desarrollo iOS: macOS con Xcode
- Para desarrollo Android: Android Studio con emulador configurado

## ⚙️ Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` con las configuraciones necesarias:
```
# API
API_URL=http://localhost:3001/api

# Servicios externos
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anon-supabase
STRIPE_PUBLIC_KEY=tu-clave-publica-stripe

# Configuración de la aplicación
DEFAULT_LOCALE=es
```

## 🚀 Scripts Disponibles

- **Desarrollo**:
  ```bash
  npm start
  ```
  Inicia el servidor de desarrollo de Expo. Puedes abrir la aplicación en:
  - iOS Simulator (requiere macOS)
  - Android Emulator
  - Dispositivo físico con Expo Go
  - Web (experimental)

- **iOS**:
  ```bash
  npm run ios
  ```
  Inicia la aplicación en el simulador de iOS (solo macOS).

- **Android**:
  ```bash
  npm run android
  ```
  Inicia la aplicación en el emulador de Android.

- **Web**:
  ```bash
  npm run web
  ```
  Inicia la aplicación en modo web (experimental).

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

- **Build (EAS)**:
  ```bash
  eas build --platform ios
  eas build --platform android
  ```
  Construye la aplicación para iOS o Android usando EAS Build.

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

### Pantallas

- **Home**: Pantalla principal con búsqueda y experiencias destacadas
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

La aplicación se comunica con el backend a través de un cliente API centralizado en `services/api.ts`. Utilizamos React Query para la gestión de datos con caché y revalidación automática.

Ejemplo de uso:
```typescript
import { useExperience } from '@/hooks/api/useExperiences';

function ExperienceDetail({ route }) {
  const { id } = route.params;
  const { data, isLoading, error } = useExperience(id);
  
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;
  
  return <ExperienceDetailScreen experience={data} />;
}
```

## 🎨 Diseño y Estilos

Utilizamos NativeWind (Tailwind para React Native) para los estilos:

- Paleta de colores personalizada para DiveIn
- Componentes estilizados consistentes
- Adaptación a diferentes tamaños de pantalla
- Soporte para modo oscuro (si está implementado)

## 📱 Funcionalidades Específicas para Móvil

- **Notificaciones Push**: Para alertas de reservas y mensajes
- **Geolocalización**: Para encontrar experiencias cercanas
- **Cámara**: Para subir fotos de perfil y experiencias
- **Compartir**: Integración con compartir nativo
- **Modo Offline**: Caché básica para uso sin conexión

## 🚢 Despliegue

### Publicación en App Store (iOS)

1. Configurar EAS:
```bash
eas build:configure
```

2. Construir para iOS:
```bash
eas build --platform ios
```

3. Enviar a App Store Connect:
```bash
eas submit --platform ios
```

### Publicación en Google Play (Android)

1. Configurar EAS:
```bash
eas build:configure
```

2. Construir para Android:
```bash
eas build --platform android
```

3. Enviar a Google Play:
```bash
eas submit --platform android
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

## 🔄 Desarrollo con Expo

### Desarrollo en dispositivo físico

1. Instala la aplicación Expo Go en tu dispositivo
2. Ejecuta `npm start` en el proyecto
3. Escanea el código QR con la cámara (iOS) o la app Expo Go (Android)

### Desarrollo con emuladores

1. Configura el emulador de Android o el simulador de iOS
2. Ejecuta `npm run android` o `npm run ios`

### Actualizaciones OTA (Over-The-Air)

Expo permite enviar actualizaciones sin pasar por las tiendas de aplicaciones:

```bash
eas update --branch production
```
