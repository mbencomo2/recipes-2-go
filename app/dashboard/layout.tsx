import SideNav from '../ui/dashboard/sideNav';
import { martel } from '../ui/fonts';
import Footer from '../ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className={`${martel.className} w-full flex-none md:w-64`}>
        <SideNav />
      </div>
      <div
        className={`${martel.className} flex h-full flex-grow flex-col p-6 md:overflow-y-auto md:px-12 md:pb-0 md:pt-12`}
      >
        {children}
        <Footer />
      </div>
    </div>
  );
}
