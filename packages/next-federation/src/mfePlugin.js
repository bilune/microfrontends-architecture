const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const { hostUrl, basePath } = pluginOptions;
    return Object.assign({}, nextConfig, {
      basePath,
      async rewrites() {
        if (process.env.NODE_ENV === "development") {
          return {
            beforeFiles: [
              {
                source: "/host/_next/:path*",
                destination: `${hostUrl}/host/_next/:path*`,
                basePath: false,
              },
            ],
            fallback: [
              {
                source: "/api/auth/:path*",
                destination: `${hostUrl}/api/auth/local/:path*`,
                basePath: false,
              },
              {
                source: "/:path*",
                destination: `${hostUrl}/:path*`,
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
              host: `host@${hostUrl}/_next/static/${
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
    });
  };
