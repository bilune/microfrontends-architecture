/** @type {import('next').NextConfig} */
const { mfePlugin } = require("next-federation");

const withMfePlugin = mfePlugin({
  basePath: "/mf-1",
  hostUrl: process.env.HOST_URL,
});

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withMfePlugin(nextConfig);
