const useOptimizedClassnames = false;

const defaultConfig = {
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['acnhapi.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 120,
  },
}

module.exports = useOptimizedClassnames 
  ? require('./packages/next-optimized-classnames')(defaultConfig) 
  : defaultConfig;