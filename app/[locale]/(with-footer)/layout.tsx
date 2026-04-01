import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';

export default function WithLayoutGroup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
