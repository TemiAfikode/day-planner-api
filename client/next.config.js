/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    NEXT_PROD_URL: "https://temi-day-planner.herokuapp.com/api",
    NEXT_LOCAL_URL: "http://localhost:9000/api"
  },
};

