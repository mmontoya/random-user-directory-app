import path, { join } from 'path';
const __dirname = path.resolve();

export const sassOptions = {
  includePaths: [join(__dirname, 'styles')],
};

export const i18n = {
  locales: ['default', 'en', 'es'],
  defaultLocale: 'default',
  localeDetection: false,
};
export async function exportPathMap() {
  return {
    '/': { page: '/index' },
    '/home': { page: '/home' },
    'user-detail': { page: '/userDetail' },
  };
}
