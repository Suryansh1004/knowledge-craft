/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone', // Added for potentially better deployment packaging
  typescript: {
    ignoreBuildErrors: false, 
  },
  eslint: {
    ignoreDuringBuilds: false, 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      handlebars: 'commonjs handlebars',
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };
    return config;
  },
};

module.exports = nextConfig;
