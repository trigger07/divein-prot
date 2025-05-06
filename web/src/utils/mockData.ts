/**
 * Archivo de datos de muestra para experiencias
 * En una implementación real, estos datos vendrían de una API
 */

// Función para obtener datos de experiencia de muestra según el ID
export function getMockExperience(id: string) {
  // Experiencia de tour gastronómico (original)
  if (id === "food-tour-barcelona" || id === "1") {
    return {
      id,
      title: 'Tour gastronómico por los mercados locales de Barcelona',
      description: 'Descubre los sabores auténticos de Barcelona en este recorrido por los mercados más emblemáticos de la ciudad. Acompañado por un guía local experto en gastronomía, visitarás el famoso Mercado de La Boquería y otros mercados menos conocidos pero igualmente fascinantes.\n\nProbarás una selección de tapas tradicionales, embutidos ibéricos, quesos artesanales y dulces típicos. Aprenderás sobre la historia culinaria de Cataluña y las técnicas de preparación de los platos más representativos.\n\nEsta experiencia incluye paradas en pequeñas tiendas familiares que han mantenido sus recetas por generaciones, donde podrás degustar productos frescos y hablar directamente con los productores locales.',
      price: 65,
      currency: 'EUR',
      duration: 180, // 3 horas en minutos
      maxGroupSize: 8,
      languages: ['Español', 'Inglés', 'Catalán', 'Francés'],
      location: 'Barcelona, España',
      included: [
        'Degustación de 8 tapas tradicionales',
        'Bebidas (agua, vino o refresco)',
        'Guía gastronómico local experto',
        'Visita a 3 mercados emblemáticos',
        'Recetas tradicionales para llevar'
      ],
      excluded: [
        'Transporte hasta el punto de encuentro',
        'Propinas (opcionales)',
        'Compras personales en los mercados'
      ],
      host: {
        id: 'host-1',
        name: 'Carlos Martínez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        rating: 4.9,
        reviewCount: 128
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          alt: 'Variedad de tapas españolas en un mercado local'
        },
        {
          src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          alt: 'Coloridos ingredientes frescos en el mercado'
        },
        {
          src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
          alt: 'Chef preparando platos tradicionales'
        },
        {
          src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          alt: 'Plato gourmet de alta cocina catalana'
        },
        {
          src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          alt: 'Mercado local de Barcelona con puestos coloridos'
        }
      ]
    };
  }

  // Experiencia de senderismo en montaña
  if (id === "mountain-hiking" || id === "2") {
    return {
      id,
      title: 'Senderismo en montaña con vistas panorámicas',
      description: 'Disfruta de una experiencia única de senderismo en las montañas de los Pirineos, con impresionantes vistas panorámicas y paisajes naturales de ensueño. Esta ruta, guiada por expertos locales, te llevará por senderos poco transitados donde podrás conectar con la naturaleza en su estado más puro.\n\nA lo largo del recorrido, aprenderás sobre la flora y fauna local, así como la historia geológica de estas majestuosas montañas. Haremos paradas estratégicas para descansar, tomar fotografías y disfrutar de un picnic con productos locales en un mirador espectacular.\n\nEsta experiencia está diseñada para amantes de la naturaleza con un nivel físico medio, no se requiere experiencia previa en montañismo.',
      price: 85,
      currency: 'EUR',
      duration: 300, // 5 horas en minutos
      maxGroupSize: 10,
      languages: ['Español', 'Inglés', 'Catalán'],
      location: 'Pirineos, España',
      included: [
        'Guía experto en montaña',
        'Picnic con productos locales',
        'Equipo básico de seguridad',
        'Fotografías de la experiencia',
        'Seguro de actividades al aire libre'
      ],
      excluded: [
        'Transporte hasta el punto de inicio',
        'Equipo personal (botas, ropa, etc.)',
        'Bebidas adicionales'
      ],
      host: {
        id: 'host-2',
        name: 'Ana López',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        rating: 4.8,
        reviewCount: 95
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          alt: 'Vistas panorámicas desde la cima de la montaña'
        },
        {
          src: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80',
          alt: 'Sendero en medio del bosque montañoso'
        },
        {
          src: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
          alt: 'Grupo de senderistas disfrutando de la experiencia'
        },
        {
          src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          alt: 'Impresionantes montañas de los Pirineos'
        },
        {
          src: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          alt: 'Picnic con productos locales en la montaña'
        }
      ]
    };
  }

  // Por defecto, devolver la experiencia gastronómica
  return getMockExperience("1");
}
