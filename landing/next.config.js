const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require("next-optimized-images");
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // webpack5: false,
  // distDir: '../../dist/functions/next'
  trailingSlash: true,
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, path: false };
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  env: {
    RESOURCE_ID: process.env.RESOURCE_ID,
    API_URL: process.env.API_URL,
    BRANCH_KEY: process.env.BRANCH_KEY,
    KOMMUNICATE_APP_ID: process.env.KOMMUNICATE_APP_ID,
    PROJECT_DIRNAME: __dirname,
    FIREBASE_apiKey: process.env.FIREBASE_apiKey,
    FIREBASE_authDomain: process.env.FIREBASE_authDomain,
    FIREBASE_databaseURL: process.env.FIREBASE_databaseURL,
    FIREBASE_projectId: process.env.FIREBASE_projectId,
    FIREBASE_storageBucket: process.env.FIREBASE_storageBucket,
    FIREBASE_messagingSenderId: process.env.FIREBASE_messagingSenderId,
    FIREBASE_appId: process.env.FIREBASE_appId,
    FIREBASE_measurementId: process.env.FIREBASE_measurementId,
    PROD_URL: process.env.PROD_URL,
    BOT_ID: process.env.BOT_ID,
    APP_VERSION: process.env.APP_VERSION,
  },
};

const moduleExports = withPlugins([
  [
    withOptimizedImages,
    {
      mozjpeg: {
        quality: 90,
      },
      webp: {
        preset: "default",
        quality: 90,
      },
    },
  ],
  [withBundleAnalyzer]
], nextConfig);

const sentryWebpackPluginOptions = {
  silent: true
};

// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
module.exports = moduleExports;
