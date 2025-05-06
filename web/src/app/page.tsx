"use client";

import HeroSection from '@/components/layout/HeroSection';
import FeaturedExperiences from '@/components/experiences/FeaturedExperiences';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
// Importamos un ícono de flecha desde una biblioteca de iconos
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

// Datos de ejemplo para las experiencias destacadas
const featuredExperiences = [
  {
    id: '1',
    title: 'Tour gastronómico por el mercado local',
    description: 'Descubre los sabores auténticos de la cocina local con un chef experto.',
    price: 45,
    currency: 'USD',
    location: {
      city: 'Barcelona',
      country: 'España'
    },
    type: 'gastronomy',
    duration: 3,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    hostName: 'Carlos Martínez',
    hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    id: '2',
    title: 'Senderismo en montaña con vistas panorámicas',
    description: 'Explora senderos escondidos con un guía local experimentado.',
    price: 65,
    currency: 'USD',
    location: {
      city: 'Ciudad de México',
      country: 'México'
    },
    type: 'adventure',
    duration: 5,
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    hostName: 'Ana López',
    hostImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    id: '3',
    title: 'Taller de artesanía tradicional',
    description: 'Aprende técnicas ancestrales de artesanía con maestros locales.',
    price: 35,
    currency: 'USD',
    location: {
      city: 'Tokio',
      country: 'Japón'
    },
    type: 'cultural',
    duration: 2,
    rating: 4.7,
    reviewCount: 74,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    hostName: 'Takeshi Yamamoto',
    hostImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    id: '4',
    title: 'Recorrido por la selva tropical',
    description: 'Descubre la biodiversidad de la selva con un biólogo experto.',
    price: 55,
    currency: 'USD',
    location: {
      city: 'San José',
      country: 'Costa Rica'
    },
    type: 'nature',
    duration: 4,
    rating: 4.9,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
    hostName: 'María Fernández',
    hostImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80'
  }
];

// Componentes de iconos minimalistas para categorías
const GastronomyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const AdventureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
    <polyline points="7 10 12 5 17 10"/>
  </svg>
);

const CultureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="13" width="16" height="6" rx="2"/>
    <rect x="2" y="7" width="20" height="6" rx="2"/>
    <line x1="12" y1="3" x2="12" y2="7"/>
    <line x1="8" y1="19" x2="8" y2="22"/>
    <line x1="16" y1="19" x2="16" y2="22"/>
  </svg>
);

const NatureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <path d="M7 10a5 5 0 0 0 10 0c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/>
    <path d="M12 10a1 1 0 0 0 0-2 1 1 0 0 0 0 2z"/>
  </svg>
);

// Datos de ejemplo para categorías populares
const popularCategories = [
  {
    name: 'Gastronomía',
    icon: <GastronomyIcon />,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    count: 120,
    description: 'Descubre los sabores auténticos de la gastronomía local con chefs expertos y tours culinarios únicos.'
  },
  {
    name: 'Aventura',
    icon: <AdventureIcon />,
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80',
    count: 85,
    description: 'Vive experiencias llenas de adrenalina con actividades al aire libre para los amantes de la aventura.'
  },
  {
    name: 'Cultural',
    icon: <CultureIcon />,
    image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    count: 150,
    description: 'Sumérgete en la historia y tradiciones locales con visitas guiadas a museos, monumentos y sitios históricos.'
  },
  {
    name: 'Naturaleza',
    icon: <NatureIcon />,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    count: 95,
    description: 'Conecta con la naturaleza en su estado más puro a través de rutas de senderismo, observación de fauna y paisajes impresionantes.'
  }
];

// Datos de ejemplo para destinos populares
const popularDestinations = [
  {
    name: 'Barcelona',
    country: 'España',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    count: 48
  },
  {
    name: 'Ciudad de México',
    country: 'México',
    image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    count: 36
  },
  {
    name: 'Tokio',
    country: 'Japón',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1488&q=80',
    count: 42
  },
  {
    name: 'Nueva York',
    country: 'Estados Unidos',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    count: 53
  }
];

interface ExperienceTranslation {
  title_en: string;
  description_en: string;
  hostName_en: string;
}

const experienceTranslations: Record<string, ExperienceTranslation> = {
  '1': {
    title_en: 'Local Market Food Tour',
    description_en: 'Discover authentic local flavors with an expert chef.',
    hostName_en: 'Carlos Martinez'
  },
  '2': {
    title_en: 'Mountain Hiking with Panoramic Views',
    description_en: 'Explore hidden trails with an experienced local guide.',
    hostName_en: 'Ana Lopez'
  },
  '3': {
    title_en: 'Traditional Craft Workshop',
    description_en: 'Learn ancestral crafting techniques with local masters.',
    hostName_en: 'Takeshi Yamamoto'
  },
  '4': {
    title_en: 'Tropical Rainforest Tour',
    description_en: 'Discover the rainforest\'s biodiversity with an expert biologist.',
    hostName_en: 'Maria Fernandez'
  }
};

const countryTranslations: Record<string, string> = {
  'España': 'Spain',
  'México': 'Mexico',
  'Japón': 'Japan',
  'Costa Rica': 'Costa Rica'
};

export default function Home() {
  const { t, i18n } = useTranslation();

  // Datos traducidos para las experiencias destacadas
  const translatedExperiences = featuredExperiences.map(exp => ({
    ...exp,
    title: i18n.language === 'en' ? experienceTranslations[exp.id]?.title_en || exp.title : exp.title,
    description: i18n.language === 'en' ? experienceTranslations[exp.id]?.description_en || exp.description : exp.description,
    location: {
      ...exp.location,
      country: i18n.language === 'en' ? countryTranslations[exp.location.country] || exp.location.country : exp.location.country
    },
    hostName: i18n.language === 'en' ? experienceTranslations[exp.id]?.hostName_en || exp.hostName : exp.hostName
  }));

  // Datos traducidos para las categorías populares
  const translatedCategories = popularCategories.map(cat => ({
    ...cat,
    name: t(`home.categories.${cat.name}`)
  }));

  // Datos traducidos para los destinos populares
  const translatedDestinations = popularDestinations.map(dest => ({
    ...dest,
    country: i18n.language === 'en' ? countryTranslations[dest.country] || dest.country : dest.country
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80"
      />

      {/* Featured Experiences */}
      <FeaturedExperiences
        title={t("home.featuredExperiences.title")}
        subtitle={t("home.featuredExperiences.subtitle")}
        experiences={translatedExperiences}
        viewAllLink="/experiences"
        className="bg-neutral-50"
      />

      {/* Quiénes somos */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-neutral-100">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full border-4 border-dashed border-primary-100 opacity-30 -rotate-6"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-blue-50 opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="h-1 bg-gradient-to-r from-primary-400 via-blue-500 to-indigo-600 mb-12 rounded-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Columna izquierda: Información sobre la empresa */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-6">
                {t("home.aboutUs.tagline", "Nuestra visión")}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
                {t("home.aboutUs.title", "Conectamos ideas, destinos y experiencias")}
              </h2>
              
              <p className="text-lg text-neutral-600 mb-8">
                {t("home.aboutUs.description", "Somos una empresa multidisciplinaria que diseña, impulsa y acompaña proyectos con propósito, con alcance global y enfoque boutique. En DiveIn creemos que las experiencias auténticas tienen el poder de transformar vidas y comunidades.")}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">120+</p>
                  <p className="text-neutral-600 text-sm">{t("home.aboutUs.stats.experiences", "Experiencias únicas")}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">15+</p>
                  <p className="text-neutral-600 text-sm">{t("home.aboutUs.stats.countries", "Países")}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">5K+</p>
                  <p className="text-neutral-600 text-sm">{t("home.aboutUs.stats.clients", "Clientes satisfechos")}</p>
                </div>
              </div>
              
              <button className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-300">
                {t("home.aboutUs.cta", "Conoce más sobre nosotros")}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Columna derecha: Imagen del equipo */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                  alt="Equipo DiveIn" 
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Tarjeta de testimonio superpuesta */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-700 text-sm italic mb-4">"DiveIn transformó nuestra forma de viajar y conocer el mundo. Experiencias auténticas con impacto real."</p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Cliente" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-sm">María García</p>
                    <p className="text-xs text-neutral-500">Cliente desde 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Valores de la empresa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            <div className="pt-6 border-t-2 border-primary-400">
              <h3 className="text-xl font-bold mb-3">{t("home.aboutUs.values.authentic.title", "Experiencias auténticas")}</h3>
              <p className="text-neutral-600">
                {t("home.aboutUs.values.authentic.description", "Creamos conexiones genuinas entre viajeros y destinos, priorizando lo local y sostenible.")}
              </p>
            </div>
            
            <div className="pt-6 border-t-2 border-blue-500">
              <h3 className="text-xl font-bold mb-3">{t("home.aboutUs.values.impact.title", "Impacto positivo")}</h3>
              <p className="text-neutral-600">
                {t("home.aboutUs.values.impact.description", "Cada experiencia está diseñada para generar un impacto positivo en las comunidades locales y el medio ambiente.")}
              </p>
            </div>
            
            <div className="pt-6 border-t-2 border-indigo-500">
              <h3 className="text-xl font-bold mb-3">{t("home.aboutUs.values.innovation.title", "Innovación constante")}</h3>
              <p className="text-neutral-600">
                {t("home.aboutUs.values.innovation.description", "Exploramos continuamente nuevas formas de conectar personas con experiencias transformadoras.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-neutral-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 font-heading">{t('home.categories.title')}</h2>
              <p className="text-neutral-600 max-w-2xl">{t('home.categories.subtitle')}</p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" href="/categories">
              {t('home.categories.viewAll')}
              <ChevronRightIcon />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {translatedCategories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase()}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 h-full group">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-5 relative">
                    <div className="absolute -top-8 left-5 w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 shadow-md border-2 border-white">
                      <div className="w-6 h-6">
                        {category.icon}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold group-hover:text-primary-500 transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-sm font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                          {category.count} {t('home.categories.experiences')}
                        </span>
                      </div>
                      
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                        {category.description || t(`home.categories.descriptions.${category.name.toLowerCase()}`, 'Descubre experiencias únicas en esta categoría')}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-neutral-200 border border-white overflow-hidden">
                              <img 
                                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`} 
                                alt="Host" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <span className="text-sm font-medium text-primary-500 flex items-center">
                          {t('common.explore')}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10 md:hidden">
            <Button href="/categories" variant="outline">
              {t("home.categories.viewAll")}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Popular Destinations - Diseño tipo Mapa Interactivo */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/world-map-dots.svg')] bg-no-repeat bg-center opacity-5"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary-200/10 to-blue-200/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-indigo-200/10 to-blue-200/10 blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 relative inline-block">
              {t("home.destinations.title")}
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              {t("home.destinations.subtitle")}
            </p>
          </div>
          
          {/* Mapa Interactivo con Línea de Tiempo */}
          <div className="relative h-[450px] mb-12">
            {/* Línea de tiempo horizontal */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-100 via-primary-300 to-primary-100 transform -translate-y-1/2 z-0"></div>
            
            {/* Destinos en la línea de tiempo */}
            {translatedDestinations.map((destination, index) => {
              // Calculamos posiciones alternadas arriba y abajo de la línea de tiempo
              const isTop = index % 2 === 0;
              const topPosition = isTop ? '5%' : '55%';
              // Distribuimos horizontalmente los destinos con más espacio entre ellos
              const leftPositions = ['10%', '35%', '60%', '85%'];
              // Tamaños más compactos para los destinos
              const size = 'w-48 h-48';
              
              return (
                <div 
                  key={destination.name} 
                  className="absolute transform transition-all duration-700 z-10 group"
                  style={{ 
                    top: topPosition,
                    left: leftPositions[index],
                  }}
                >
                  {/* Línea vertical que conecta con la línea de tiempo */}
                  <div 
                    className={`absolute left-1/2 ${isTop ? 'top-full' : 'bottom-full'} w-0.5 h-16 bg-gradient-to-b from-primary-300 to-transparent transform -translate-x-1/2`}
                  ></div>
                  
                  {/* Punto de conexión en la línea de tiempo */}
                  <div 
                    className="absolute w-3 h-3 rounded-full bg-primary-500 shadow-lg transform -translate-x-1/2 left-1/2"
                    style={{ 
                      top: isTop ? 'calc(100% + 64px)' : 'auto',
                      bottom: !isTop ? 'calc(100% + 64px)' : 'auto',
                    }}
                  ></div>
                  
                  {/* Contenedor principal del destino */}
                  <Link 
                    href={`/destinations/${destination.name.toLowerCase()}`}
                    className="block relative group"
                  >
                    {/* Destino */}
                    <div className={`${size} relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1`}>
                      {/* Imagen de fondo */}
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
                      </div>
                      
                      {/* Contenido superpuesto */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                        {/* Etiqueta de país flotante */}
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                          <span className="text-xs font-medium text-white">{destination.country}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-1 drop-shadow-md transform transition-transform duration-300 group-hover:translate-x-1">{destination.name}</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary-500/80 backdrop-blur-sm flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <span className="block text-xs font-medium">{destination.count}</span>
                              <span className="block text-xs opacity-80">{t('home.destinations.experiences')}</span>
                            </div>
                          </div>
                          
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform group-hover:bg-primary-500/80">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Etiqueta de temporada */}
                    <div 
                      className={`absolute ${isTop ? 'bottom-0' : 'top-0'} left-1/2 transform -translate-x-1/2 ${isTop ? '-translate-y-8' : 'translate-y-8'} bg-white shadow-md rounded-lg px-3 py-1 text-center min-w-[100px]`}
                    >
                      <span className="block text-sm font-medium text-primary-600">{['Primavera', 'Verano', 'Otoño', 'Invierno'][index]}</span>
                      <span className="block text-xs text-neutral-500">Temporada ideal</span>
                    </div>
                  </Link>
                </div>
              );
            })}
            
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-10 opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-200" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Estadísticas en contenedores modernos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-2">
            {[
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>, 
                label: t('home.destinations.stats.countries', 'Países'), 
                value: '25+' 
              },
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>, 
                label: t('home.destinations.stats.cities', 'Ciudades'), 
                value: '120+' 
              },
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>, 
                label: t('home.destinations.stats.experiences', 'Experiencias'), 
                value: '500+' 
              },
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>, 
                label: t('home.destinations.stats.travelers', 'Viajeros'), 
                value: '10K+' 
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center space-x-4 group hover:bg-primary-50">
                <div className="bg-primary-50 p-3 rounded-lg group-hover:bg-white transition-colors duration-300">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button href="/destinations" variant="primary" size="lg" className="group">
              {t("home.destinations.viewAll")}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Estilos para las animaciones */}
        <style jsx global>{`
          @keyframes float1 {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-20px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(20px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
            50% { transform: translate(-50%, -50%) translateY(-15px) translateX(15px); }
          }
          @keyframes float4 {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
            50% { transform: translate(-50%, -50%) translateY(15px) translateX(-15px); }
          }
          .animate-bounce-slow {
            animation: bounce 3s infinite;
          }
          .animate-spin-slow {
            animation: spin 15s linear infinite;
          }
        `}</style>
      </section>
      
      
      {/* Become a Host */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 font-heading">{t("home.becomeHost.title2")}</h2>
              <p className="text-lg mb-6 text-neutral-600">
                {t("home.becomeHost.description")}
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-neutral-600">{t("home.becomeHost.point1")}</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-neutral-600">{t("home.becomeHost.point2")}</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-neutral-600">{t("home.becomeHost.point3")}</p>
                </li>
              </ul>
              
              <Button href="/host/signup" variant="primary" size="lg">
                {t("home.becomeHost.startNow")}
              </Button>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Anfitrión compartiendo experiencia"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
