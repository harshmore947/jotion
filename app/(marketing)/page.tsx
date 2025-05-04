import { Footer } from "./_components/Footer";
import { Heading } from "./_components/Haeading";
import { Heros } from "./_components/Heros";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="px-6 pb-6 flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;