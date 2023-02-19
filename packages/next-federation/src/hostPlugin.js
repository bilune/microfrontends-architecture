const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports =
  (pluginOptions = {}) =>
  (nextConfig = {}) => {
    const { exposes = {}, childApps = [] } = pluginOptions;

    const mfeRewrites = childApps.flatMap((childApp) => {
      return [
        {
          source: childApp.path,
          destination: `${childApp.host}${childApp.path}`,
        },
        {
          source: `${childApp.path}/:path*`,
          destination: `${childApp.host}${childApp.path}/:path*`,
        },
      ];
    });

    return Object.assign({}, nextConfig, {
      assetPrefix: "/host",
      async rewrites() {
        return [
          ...mfeRewrites,
          {
            source: "/host/_next/:path*",
            destination: "/_next/:path*",
          },
        ];
      },
      webpack(config) {
        config.plugins.push(
          new NextFederationPlugin({
            name: "host",
            filename: "static/chunks/remoteEntry.js",
            exposes,
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
