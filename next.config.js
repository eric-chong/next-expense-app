/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/budgets/:budgetId/:path*',
        destination: '/budgets/:budgetId/',
      },
      { source: '/budgets/current/:path*', destination: '/budgets/current/' },
      {
        source: '/expenses/:path*',
        destination: '/expenses/',
      },
    ];
  },
};

module.exports = nextConfig;
