import { Metadata } from 'next';
import { martel } from '../ui/fonts';
import Footer from '../ui/footer';
import Header from '../ui/header';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
