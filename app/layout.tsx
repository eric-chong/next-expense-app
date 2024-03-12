import CssBaseline from '@mui/material/CssBaseline';
import { inter, roboto } from '@/app/ui/fonts';
import '@/app/ui/global.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/app/ui/Layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CssBaseline />
      <body className={`${roboto.className} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
