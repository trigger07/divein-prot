# DiveIn - Código Compartido (Shared)

Este directorio contiene código compartido entre los diferentes componentes del proyecto DiveIn (web, mobile y server).

## 🏗️ Estructura

```
shared/
├── types/                    # Definiciones de tipos TypeScript
│   ├── models/               # Modelos de datos
│   ├── api/                  # Tipos para respuestas de API
│   └── index.ts              # Exportaciones
├── constants/                # Constantes compartidas
│   ├── experienceTypes.ts    # Tipos de experiencias
│   ├── languages.ts          # Idiomas soportados
│   └── index.ts              # Exportaciones
├── utils/                    # Utilidades compartidas
│   ├── formatters.ts         # Formateadores (fechas, moneda, etc.)
│   ├── validators.ts         # Funciones de validación
│   └── index.ts              # Exportaciones
├── locales/                  # Archivos de traducción
│   ├── es/                   # Español
│   ├── en/                   # Inglés
│   └── pt/                   # Portugués
├── package.json              # Dependencias y scripts
└── tsconfig.json             # Configuración de TypeScript
```

## 🔧 Propósito

El código compartido tiene varios propósitos:

1. **Consistencia**: Mantener definiciones de tipos, constantes y utilidades consistentes entre frontend y backend
2. **DRY (Don't Repeat Yourself)**: Evitar duplicación de código
3. **Mantenibilidad**: Centralizar cambios en un solo lugar
4. **Internacionalización**: Compartir traducciones entre plataformas

## 📋 Componentes Principales

### Tipos (types/)

Definiciones de TypeScript compartidas entre frontend y backend:

```typescript
// Ejemplo: types/models/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'traveler' | 'host';
  profilePicture?: string;
  createdAt: string;
}

// Ejemplo: types/models/Experience.ts
export interface Experience {
  id: string;
  hostId: string;
  title: string;
  description: string;
  location: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  type: ExperienceType;
  price: number;
  duration: number;
  languages: string[];
  maxPeople: number;
  images: string[];
  availableDates: string[];
  rating: number;
  status: 'active' | 'inactive';
  createdAt: string;
}
```

### Constantes (constants/)

Valores constantes utilizados en toda la aplicación:

```typescript
// Ejemplo: constants/experienceTypes.ts
export const EXPERIENCE_TYPES = [
  'gastronomy',
  'adventure',
  'cultural',
  'nature',
  'urban',
  'other'
] as const;

export type ExperienceType = typeof EXPERIENCE_TYPES[number];

// Ejemplo: constants/languages.ts
export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' }
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];
```

### Utilidades (utils/)

Funciones de utilidad compartidas:

```typescript
// Ejemplo: utils/formatters.ts
export const formatCurrency = (
  amount: number,
  currency = 'USD',
  locale = 'es-ES'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatDate = (
  date: string | Date,
  format = 'long',
  locale = 'es-ES'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = 
    format === 'long' 
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };
      
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};
```

### Traducciones (locales/)

Archivos de traducción compartidos entre web y mobile:

```json
// Ejemplo: locales/es/common.json
{
  "app": {
    "name": "DiveIn",
    "tagline": "Experiencias locales auténticas"
  },
  "nav": {
    "home": "Inicio",
    "experiences": "Experiencias",
    "reservations": "Reservas",
    "profile": "Perfil",
    "host": "Anfitrión"
  },
  "auth": {
    "login": "Iniciar sesión",
    "signup": "Registrarse",
    "logout": "Cerrar sesión"
  }
}

// Ejemplo: locales/es/experiences.json
{
  "search": {
    "title": "Encuentra experiencias únicas",
    "placeholder": "¿Qué quieres hacer?",
    "location": "Ubicación",
    "dates": "Fechas",
    "guests": "Personas",
    "search": "Buscar"
  },
  "filters": {
    "title": "Filtros",
    "price": "Precio",
    "duration": "Duración",
    "language": "Idioma",
    "type": "Tipo",
    "apply": "Aplicar filtros"
  }
}
```

## ⚙️ Uso

### Instalación

Para utilizar este código compartido en los proyectos web, mobile y server:

1. Instalar dependencias:
```bash
cd shared
npm install
```

2. Construir el paquete (si es necesario):
```bash
npm run build
```

### Importación en otros proyectos

Desde los proyectos web, mobile y server, puedes importar el código compartido:

```typescript
// En web o mobile
import { Experience, ExperienceType } from '@/shared/types';
import { formatCurrency, formatDate } from '@/shared/utils';
import { EXPERIENCE_TYPES } from '@/shared/constants';

// En server
import { Experience, ExperienceType } from '../shared/types';
import { formatCurrency, formatDate } from '../shared/utils';
import { EXPERIENCE_TYPES } from '../shared/constants';
```

## 🔄 Actualización

Al actualizar el código compartido, asegúrate de:

1. Mantener la compatibilidad con versiones anteriores cuando sea posible
2. Actualizar la documentación
3. Comunicar cambios importantes a todos los equipos

## 🧪 Testing

Ejecutar los tests:
```bash
npm test
```

## 📝 Convenciones de Código

- Seguimos las convenciones de ESLint y Prettier configuradas
- Usamos TypeScript para tipo seguro
- Documentamos con JSDoc para mejor intellisense
- Exportamos todo a través de archivos index.ts para facilitar las importaciones
