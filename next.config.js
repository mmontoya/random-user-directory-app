import path, { join } from 'path';
const __dirname = path.resolve();

export const sassOptions = {
  includePaths: [join(__dirname, 'styles')],
};

export const i18n = {
  locales: ['en-US', 'es'],
  defaultLocale: 'en-US',
};
export async function exportPathMap() {
  return {
    '/': { page: '/index' },
    '/home': { page: '/home' },
    'user-detail': { page: '/userDetail' },
  };
}

// module.exports = {
//   sassOptions: {
//     includePaths: [join(__dirname, 'styles')],
//   },
//   trailingSlash: true,
//   i18n: {
//     locales: ['default', 'en-US', 'es'],
//     defaultLocale: 'default',
//     localeDetection: false,
//   },
//   exportPathMap: async function () {
//     return {
//       '/': { page: '/index' },
//       '/home': { page: '/home' },
//       'user-detail': { page: '/userDetail' },
//     };
//   },
// };
