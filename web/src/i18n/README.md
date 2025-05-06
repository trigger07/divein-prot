# Internacionalización en DiveIn

Este directorio contiene la configuración y los recursos necesarios para la internacionalización (i18n) de la aplicación web DiveIn.

## Estructura

```
/i18n
  /locales
    - es.json    # Traducciones en español
    - en.json    # Traducciones en inglés
    - pt.json    # (Pendiente) Traducciones en portugués
  - i18n.ts      # Configuración de i18next
  - README.md    # Esta documentación
```

## Tecnologías utilizadas

- **i18next**: Biblioteca principal para internacionalización
- **react-i18next**: Integración de i18next con React
- **i18next-browser-languagedetector**: Detección automática del idioma del navegador
- **next-i18next**: Integración con Next.js

## Cómo añadir nuevas traducciones

1. Localiza la clave adecuada en los archivos de traducción (`es.json`, `en.json`, etc.)
2. Añade la nueva clave siguiendo la estructura jerárquica existente
3. Asegúrate de añadir la traducción en todos los idiomas soportados

## Cómo usar las traducciones en componentes

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
      
      {/* Con variables */}
      <p>{t('common.welcome', { name: 'John' })}</p>
      
      {/* Con pluralización */}
      <p>{t('common.items', { count: 5 })}</p>
    </div>
  );
};
```

## Cambiar el idioma

El componente `LanguageSwitcher` permite a los usuarios cambiar el idioma de la aplicación. Este componente se encuentra en `/components/ui/LanguageSwitcher.tsx` y puede ser personalizado según las necesidades del proyecto.

```tsx
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

// En tu componente
<LanguageSwitcher variant="dropdown" showFlags={true} showNames={true} />
```

## Idiomas soportados

- Español (es) - Idioma predeterminado
- Inglés (en)
- Portugués (pt) - Pendiente de implementación

## Consideraciones para el desarrollo

1. **Evitar textos hardcodeados**: Todos los textos visibles para el usuario deben usar el sistema de traducciones.
2. **Mantener las claves organizadas**: Seguir la estructura jerárquica existente.
3. **Usar variables para valores dinámicos**: Evitar concatenar strings.
4. **Considerar el contexto**: Algunas palabras pueden tener diferentes traducciones según el contexto.
5. **Pluralización**: Utilizar las funciones de pluralización para textos que varían según cantidades.

## Recursos adicionales

- [Documentación de i18next](https://www.i18next.com/)
- [Documentación de react-i18next](https://react.i18next.com/)
- [Documentación de next-i18next](https://github.com/i18next/next-i18next)
