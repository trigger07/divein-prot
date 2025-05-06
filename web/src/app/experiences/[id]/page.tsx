import React from 'react';
import { Metadata } from 'next';
import ExperienceClientPage from '../../../components/experiences/ExperienceClientPage';

// Definir los tipos para los parámetros de la página
interface ExperiencePageProps {
  params: {
    id: string;
  };
}

// Esta función se ejecutará en tiempo de construcción para generar metadatos
export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  // En una implementación real, aquí se obtendría la experiencia de la API
  const experience = getMockExperience(params.id);
  
  return {
    title: `${experience.title} | DiveIn`,
    description: experience.description.substring(0, 160),
    openGraph: {
      title: experience.title,
      description: experience.description.substring(0, 160),
      images: [experience.images[0].src],
    },
  };
}

/**
 * Página de detalle de experiencia
 * Muestra toda la información de una experiencia específica
 */
export default function ExperiencePage({ params }: ExperiencePageProps) {
  // En una implementación real, aquí se obtendría la experiencia de la API
  const experience = getMockExperience(params.id);
  
  return (
    <main className="container mx-auto px-4 pt-24 pb-16">
      <ExperienceClientPage experience={experience} experienceId={params.id} />
    </main>
  );
}

// Función auxiliar para obtener datos de experiencia de muestra
// En una implementación real, esto se reemplazaría con una llamada a la API
function getMockExperience(id: string) {
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
      languages: ['Español', 'Inglés', 'Catalán'],
      location: 'Barcelona, España',
      included: [
        'Degustación de 8 tapas diferentes',
        'Bebidas (agua, vino o refresco)',
        'Guía gastronómico local',
        'Recetario digital de platos catalanes'
      ],
      excluded: [
        'Transporte hacia/desde el punto de encuentro',
        'Propinas (opcionales)',
        'Compras personales en los mercados'
      ],
      host: {
        id: 'host123',
        name: 'Carlos Martínez',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4.9,
        reviewCount: 127
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
          alt: 'Mercado de La Boquería en Barcelona'
        },
        {
          src: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
          alt: 'Selección de tapas españolas'
        },
        {
          src: 'https://images.unsplash.com/photo-1452195100486-9cc805987862',
          alt: 'Degustación de quesos artesanales'
        },
        {
          src: 'https://images.unsplash.com/photo-1515669097368-22e68427d265',
          alt: 'Plato de paella valenciana'
        },
        {
          src: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499',
          alt: 'Puesto de frutas en el mercado'
        },
        {
          src: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8',
          alt: 'Jamón ibérico siendo cortado a mano'
        }
      ]
    };
  }
  
  // Experiencia de senderismo en montaña (nueva)
  if (id === "mountain-hiking" || id === "2") {
    return {
      id,
      title: 'Senderismo por los senderos ocultos de los Pirineos',
      description: 'Descubre la majestuosidad de los Pirineos en esta aventura de senderismo por rutas poco transitadas. Con un guía experto en montañismo y conocedor del terreno, explorarás senderos secretos que te llevarán a miradores espectaculares, lagos cristalinos y bosques centenarios.\n\nEsta experiencia está diseñada para amantes de la naturaleza que buscan desconectar del bullicio urbano y sumergirse en la tranquilidad de la montaña. El recorrido es de dificultad media, por lo que se requiere una condición física básica.\n\nDurante el camino, aprenderás sobre la flora y fauna local, técnicas básicas de orientación en montaña y consejos para la fotografía de paisajes. Haremos paradas estratégicas para disfrutar de un picnic con productos locales mientras contemplamos las impresionantes vistas panorámicas.',
      price: 85,
      currency: 'EUR',
      duration: 360, // 6 horas en minutos
      maxGroupSize: 10,
      languages: ['Español', 'Inglés', 'Francés'],
      location: 'Pirineos, España',
      included: [
        'Guía profesional de montaña',
        'Picnic con productos locales',
        'Equipo básico de seguridad',
        'Seguro de actividades de montaña',
        'Fotos digitales de la experiencia'
      ],
      excluded: [
        'Transporte hasta el punto de inicio',
        'Equipo personal (botas, ropa, etc.)',
        'Bebidas adicionales'
      ],
      host: {
        id: 'host456',
        name: 'Laura Fernández',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 4.8,
        reviewCount: 94
      },
      images: [
        {
          src: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
          alt: 'Sendero de montaña con vistas panorámicas'
        },
        {
          src: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6',
          alt: 'Grupo de senderistas en la montaña'
        },
        {
          src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5',
          alt: 'Lago cristalino en los Pirineos'
        },
        {
          src: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a',
          alt: 'Picnic en la montaña'
        },
        {
          src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
          alt: 'Bosque en los Pirineos'
        },
        {
          src: 'https://images.unsplash.com/photo-1563299796-17596ed6b017',
          alt: 'Amanecer en la montaña'
        }
      ]
    };
  }
  
  // Si no se encuentra la experiencia, devolver la experiencia gastronómica por defecto
  return {
    id: "food-tour-barcelona",
    title: 'Tour gastronómico por los mercados locales de Barcelona',
    description: 'Descubre los sabores auténticos de Barcelona en este recorrido por los mercados más emblemáticos de la ciudad. Acompañado por un guía local experto en gastronomía, visitarás el famoso Mercado de La Boquería y otros mercados menos conocidos pero igualmente fascinantes.',
    price: 65,
    currency: 'EUR',
    duration: 180,
    maxGroupSize: 8,
    languages: ['Español', 'Inglés', 'Catalán'],
    location: 'Barcelona, España',
    included: ['Degustación de tapas', 'Guía local'],
    excluded: ['Transporte', 'Propinas'],
    host: {
      id: 'host123',
      name: 'Carlos Martínez',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.9,
      reviewCount: 127
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
        alt: 'Mercado de La Boquería en Barcelona'
      },
      {
        src: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b',
        alt: 'Selección de tapas españolas'
      }
    ]
  };
}
