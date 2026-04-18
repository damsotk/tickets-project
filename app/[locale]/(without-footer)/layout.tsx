import Header from '@/app/(components)/Header';

export default function WithLayoutGroup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
