import path, { join } from 'path';
import dotenvExpand from 'dotenv-expand';

const __dirname = path.resolve();

dotenvExpand.expand({ parsed: { ...process.env } });

export const sassOptions = {
  includePaths: [join(__dirname, 'styles')],
};

export const i18n = {
  locales: ['default', 'en', 'es', 'it', 'de', 'ja', 'nl', 'pt', 'fr', 'is'],
  defaultLocale: 'default',
  localeDetection: false,
};
