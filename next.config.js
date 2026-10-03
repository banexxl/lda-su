module.exports = {
  trailingSlash: true,
  // Self-contained server bundle for the Docker image (Phase 3 deploy).
  output: 'standalone',
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        // Self-hosted MinIO (media bucket lda-media) served via Caddy.
        protocol: 'https',
        hostname: 's3.mrbigs.cloud',
      },
      {
        // Legacy AWS S3 bucket — still serves partner logos & some hardcoded assets.
        protocol: 'https',
        hostname: 'lda-su.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};
