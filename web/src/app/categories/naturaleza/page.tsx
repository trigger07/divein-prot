"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Experiencias de ejemplo para la categoría Naturaleza
const natureExperiences = [
  {
    id: 'mountain-hiking',
    title: 'Senderismo por los senderos ocultos de los Pirineos',
    description: 'Descubre la majestuosidad de los Pirineos en esta aventura de senderismo por rutas poco transitadas.',
    price: 85,
    currency: 'EUR',
    duration: 360, // 6 horas en minutos
    location: 'Pirineos, España',
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    host: {
      name: 'Laura Fernández',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    tags: ['Montaña', 'Senderismo', 'Vistas panorámicas']
  },
  {
    id: 'amazon-exploration',
    title: 'Exploración de la selva amazónica',
    description: 'Adéntrate en la selva amazónica y descubre su increíble biodiversidad con guías locales expertos.',
    price: 120,
    currency: 'EUR',
    duration: 480, // 8 horas en minutos
    location: 'Amazonas, Brasil',
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    host: {
      name: 'Pedro Santos',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    tags: ['Selva', 'Biodiversidad', 'Aventura']
  },
  {
    id: 'lake-kayaking',
    title: 'Kayak en lagos cristalinos',
    description: 'Disfruta de un día de kayak en lagos de aguas cristalinas rodeados de impresionantes paisajes naturales.',
    price: 65,
    currency: 'EUR',
    duration: 240, // 4 horas en minutos
    location: 'Lagos de Covadonga, España',
    rating: 4.7,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5',
    host: {
      name: 'Ana Martínez',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    tags: ['Kayak', 'Lagos', 'Actividad acuática']
  },
  {
    id: 'wildlife-safari',
    title: 'Safari fotográfico de vida salvaje',
    description: 'Captura imágenes únicas de la fauna local en su hábitat natural con la ayuda de un fotógrafo profesional.',
    price: 95,
    currency: 'EUR',
    duration: 300, // 5 horas en minutos
    location: 'Parque Nacional de Doñana, España',
    rating: 4.6,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
    host: {
      name: 'Carlos Ruiz',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    tags: ['Fotografía', 'Fauna', 'Parque Nacional']
  },
  {
    id: 'waterfall-hike',
    title: 'Ruta de las cascadas escondidas',
    description: 'Descubre cascadas secretas en un recorrido por senderos poco conocidos con baños refrescantes.',
    price: 75,
    currency: 'EUR',
    duration: 360, // 6 horas en minutos
    location: 'Sierra de Cazorla, España',
    rating: 4.9,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9',
    host: {
      name: 'Elena Gómez',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    },
    tags: ['Cascadas', 'Senderismo', 'Baño natural']
  },
  {
    id: 'stargazing-night',
    title: 'Noche de observación de estrellas',
    description: 'Contempla el cielo nocturno lejos de la contaminación lumínica con telescopios profesionales.',
    price: 55,
    currency: 'EUR',
    duration: 180, // 3 horas en minutos
    location: 'Sierra Nevada, España',
    rating: 4.8,
    reviewCount: 93,
    image: 'https://images.unsplash.com/photo-1532339142463-fd0a8979791a',
    host: {
      name: 'Miguel Ángel Torres',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    tags: ['Astronomía', 'Nocturno', 'Cielo estrellado']
  }
];

export default function NatureCategoryPage() {
  const { t } = useTranslation();
  
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e" 
            alt="Naturaleza" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              <span className="mr-2">🌿</span>
              <span>{t('categories.nature')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('categories.natureTitle', 'Experiencias en la naturaleza')}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {t('categories.natureDescription', 'Conecta con la naturaleza en su estado más puro a través de rutas de senderismo, observación de fauna y paisajes impresionantes.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" href="#experiences">
                {t('categories.exploreExperiences', 'Explorar experiencias')}
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                {t('categories.filterOptions', 'Filtrar opciones')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">95+</p>
              <p className="text-neutral-600">{t('categories.experiences', 'Experiencias')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">12+</p>
              <p className="text-neutral-600">{t('categories.locations', 'Ubicaciones')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">4.8</p>
              <p className="text-neutral-600">{t('categories.avgRating', 'Valoración media')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">25+</p>
              <p className="text-neutral-600">{t('categories.localHosts', 'Anfitriones locales')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular tags */}
      <div className="bg-neutral-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">{t('categories.popularTags', 'Etiquetas populares')}</h2>
          <div className="flex flex-wrap gap-2">
            {['Senderismo', 'Montaña', 'Lagos', 'Bosques', 'Fauna', 'Fotografía', 'Cascadas', 'Parques Nacionales', 'Observación de estrellas', 'Kayak'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white rounded-full text-sm border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Experiences section */}
      <div id="experiences" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t('categories.natureExperiences', 'Experiencias en la naturaleza')}
            </h2>
            <div className="flex items-center gap-2">
              <select className="border border-neutral-300 rounded-lg px-3 py-2 bg-white text-sm">
                <option>{t('categories.sortBy', 'Ordenar por')}</option>
                <option>{t('categories.priceLowToHigh', 'Precio: menor a mayor')}</option>
                <option>{t('categories.priceHighToLow', 'Precio: mayor a menor')}</option>
                <option>{t('categories.topRated', 'Mejor valorados')}</option>
                <option>{t('categories.duration', 'Duración')}</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {natureExperiences.map((experience) => (
              <Link 
                key={experience.id}
                href={`/experiences/${experience.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-neutral-800">
                      {experience.duration / 60} {t('common.hours')}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-20"></div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {experience.title}
                      </h3>
                      <div className="flex items-center text-sm text-amber-500 font-medium ml-2 whitespace-nowrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {experience.rating} ({experience.reviewCount})
                      </div>
                    </div>
                    
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                      {experience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {experience.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img 
                          src={experience.host.avatar} 
                          alt={experience.host.name}
                          className="w-8 h-8 rounded-full mr-2 border border-white"
                        />
                        <span className="text-sm text-neutral-600">{experience.host.name}</span>
                      </div>
                      <p className="font-bold text-primary-600">
                        {new Intl.NumberFormat('es-ES', {
                          style: 'currency',
                          currency: experience.currency,
                          minimumFractionDigits: 0
                        }).format(experience.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline">
              {t('categories.loadMore', 'Cargar más experiencias')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Why choose nature experiences */}
      <div className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('categories.whyChooseNature', '¿Por qué elegir experiencias en la naturaleza?')}
            </h2>
            <p className="text-neutral-600">
              {t('categories.whyChooseNatureDesc', 'Las experiencias en la naturaleza te permiten desconectar del bullicio urbano, reconectar con el entorno natural y vivir momentos únicos en paisajes impresionantes.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl text-primary-500 mb-4">
                🌄
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('categories.scenicViews', 'Vistas panorámicas')}
              </h3>
              <p className="text-neutral-600">
                {t('categories.scenicViewsDesc', 'Disfruta de paisajes impresionantes que te dejarán sin aliento y crearán recuerdos inolvidables.')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl text-primary-500 mb-4">
                🧘
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('categories.mentalWellbeing', 'Bienestar mental')}
              </h3>
              <p className="text-neutral-600">
                {t('categories.mentalWellbeingDesc', 'Estudios demuestran que pasar tiempo en la naturaleza reduce el estrés y mejora el estado de ánimo.')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-xl text-primary-500 mb-4">
                🌱
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t('categories.localKnowledge', 'Conocimiento local')}
              </h3>
              <p className="text-neutral-600">
                {t('categories.localKnowledgeDesc', 'Aprende sobre la flora, fauna y ecosistemas locales de la mano de guías expertos y apasionados.')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('categories.whatPeopleSay', 'Lo que dice la gente')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Una experiencia increíble. El senderismo por los Pirineos superó todas mis expectativas. Las vistas eran impresionantes y nuestro guía Laura conocía cada rincón de la montaña.",
                author: "Carlos Rodríguez",
                location: "Madrid, España",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                text: "El kayak en los lagos fue una actividad perfecta para toda la familia. Aguas cristalinas, paisajes de ensueño y un guía muy atento. ¡Repetiremos seguro!",
                author: "María López",
                location: "Barcelona, España",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                text: "La noche de observación de estrellas fue mágica. Lejos de la contaminación lumínica pudimos ver la Vía Láctea como nunca antes. Miguel es un apasionado de la astronomía y transmite ese entusiasmo.",
                author: "Juan Martínez",
                location: "Valencia, España",
                avatar: "https://randomuser.me/api/portraits/men/22.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-neutral-600 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-neutral-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-primary-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('categories.readyToExplore', '¿Listo para explorar la naturaleza?')}
            </h2>
            <p className="text-neutral-600 mb-8">
              {t('categories.readyToExploreDesc', 'Descubre experiencias únicas en entornos naturales impresionantes con guías locales expertos.')}
            </p>
            <Button variant="primary" size="lg" href="#experiences">
              {t('categories.findExperience', 'Encuentra tu experiencia')}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
