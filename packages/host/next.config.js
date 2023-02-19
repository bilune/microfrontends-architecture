/** @type {import('next').NextConfig} */

const { hostPlugin } = require("next-federation");

const withHostPlugin = hostPlugin({
  exposes: {
    "./layout": "./components/layout.tsx",
    "./useUser": "./utils/useUser.ts",
  },
  childApps: [
    {
      path: "/mf-1",
      host: process.env.MFE_1_HOST,
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withHostPlugin(nextConfig);
