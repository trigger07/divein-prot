/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    localeDetection: false,
  },
  defaultNS: 'translation',
  localePath: './src/i18n/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
