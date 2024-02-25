/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/budgets/:budgetId/:path*',
        destination: '/budgets/:budgetId/',
      },
      { source: '/budgets/current/:path*', destination: '/budgets/current/' },
    ];
  },
};

module.exports = nextConfig;
