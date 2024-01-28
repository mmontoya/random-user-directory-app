import path, { join } from 'path';
const __dirname = path.resolve();

export const sassOptions = {
  includePaths: [join(__dirname, 'styles')],
};

export const i18n = {
  locales: ['default', 'en', 'es', 'it', 'de', 'ja', 'nl', 'pt', 'fr', 'is'],
  defaultLocale: 'default',
  localeDetection: false,
};
