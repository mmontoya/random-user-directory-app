const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  exportPathMap: function () {
    return {
      '/': { page: '/index' },
      '/home': { page: '/home' },
      'user-detail': { page: '/userDetail' },
    };
  },
};
