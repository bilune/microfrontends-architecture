/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const HOST_URL = process.env.HOST_URL;

const nextConfig = {
  reactStrictMode: true,
  basePath: "/mf-1",
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return {
        beforeFiles: [
          {
            source: "/host/_next/:path*",
            destination: `${HOST_URL}/host/_next/:path*`,
            basePath: false,
          },
        ],
        fallback: [
          {
            source: "/api/auth/:path*",
            destination: `${HOST_URL}/api/auth/local/:path*`,
            basePath: false,
          },
          {
            source: "/:path*",
            destination: `${HOST_URL}/:path*`,
            basePath: false,
          },
        ],
      };
    }
    return {};
  },
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "mf-1",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          host: `host@${HOST_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
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
