
import Hero from "./Components/Home/Hero";
import Featured from "./Components/Home/Featured";
import HowItWorks from "./Components/Home/HowItWorks";
import Testimonials from "./Components/Home/Testimonials";
import CTA from "./Components/Home/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Featured />
      <HowItWorks />
      {/* <Testimonials /> */}
      <CTA />
    </div>
  );
}
