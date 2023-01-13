/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less');
const { i18n } = require('./next-i18next.config');

const plugins = [
  [
    withLess,
    {
      lessLoaderOptions: { lessOptions: { javascriptEnabled: true } },
    },
  ],
];

/** @type {import('next').NextConfig} */
module.exports = withPlugins(plugins, {
  api: {
    bodyParser: false,
  },
  i18n,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});
