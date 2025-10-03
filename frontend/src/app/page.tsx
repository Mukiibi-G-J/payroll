import HeroSection from "@/components/sections/HeroSection";
import CompanySlider from "@/components/sections/CompanySlider";
import PayrollSolutions from "@/components/sections/PayrollSolutions";
import PayrollFeatures from "@/components/sections/PayrollFeatures";
import PayrollTestimonials from "@/components/sections/PayrollTestimonials";
import PayrollCTA from "@/components/sections/PayrollCTA";
import StructuredData from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <main>
      <StructuredData type="Organization" data={{}} />
      <HeroSection />
      <PayrollSolutions />
      <PayrollFeatures />
      <PayrollTestimonials />
      <PayrollCTA />
      <CompanySlider />
    </main>
  );
}
