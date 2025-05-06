import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import ClientLayout from '../components/layout/ClientLayout';

// Cargar fuentes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

// Metadatos para SEO
export const metadata: Metadata = {
  title: 'DiveIn - Experiencias turísticas locales',
  description: 'Descubre experiencias turísticas auténticas con anfitriones locales',
  keywords: 'turismo, experiencias, viajes, local, anfitriones, aventura',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-white text-neutral-900 font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
