const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  babel: {
    plugins: process.env.NODE_ENV === 'development' ? ['react-refresh/babel'] : [],
  },
};