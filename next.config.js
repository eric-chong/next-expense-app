/** @type {import('next').NextConfig} */
const nextConfig = {
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
