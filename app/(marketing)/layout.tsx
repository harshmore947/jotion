import { Navbar } from "./_components/Navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full ">
      <Navbar />
      <main className="h-full pt-30">
        {children}
      </main>
    </div>
  );
}

export default MarketingLayout;