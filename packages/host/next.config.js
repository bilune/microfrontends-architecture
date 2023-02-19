/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const MFE_1_HOST = process.env.MFE_1_HOST;

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "/host",
  async rewrites() {
    return [
      {
        source: "/mf-1",
        destination: `${MFE_1_HOST}/mf-1`,
      },
      {
        source: "/mf-1/:path*",
        destination: `${MFE_1_HOST}/mf-1/:path*`,
      },
      {
        source: "/host/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./layout": "./components/layout.tsx",
          "./useUser": "./utils/useUser.ts",
        },
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        shared: {},
      })
    );

    return config;
  },
};

module.exports = nextConfig;
