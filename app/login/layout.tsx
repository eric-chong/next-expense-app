import Layout from '@/app/ui/Layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout hasSideNav={false}>{children}</Layout>;
}
