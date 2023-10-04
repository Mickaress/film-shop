import Container from '@/components/layout/Container';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Список фильмов',
  description: 'Список фильмов',
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`h-screen flex flex-col ${roboto.className}`}>
        <Header />
        <Container>{children}</Container>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
