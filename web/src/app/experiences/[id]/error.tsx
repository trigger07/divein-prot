'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export default function ExperienceDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-16">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">
            {t('error.experienceDetailTitle', 'Error al cargar la experiencia')}
          </h2>
          <p className="text-neutral-600 mb-6">
            {t('error.experienceDetailDescription', 'No pudimos cargar los detalles de esta experiencia. Por favor, inténtalo de nuevo o explora otras experiencias.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => reset()} variant="primary">
              {t('error.tryAgain', 'Intentar de nuevo')}
            </Button>
            <Button href="/experiences" variant="outline">
              {t('error.browseExperiences', 'Ver otras experiencias')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
