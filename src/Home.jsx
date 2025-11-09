import { Compass, Share2, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./Components/Container/Container";
import Button from "./Components/Button/Button";
import FeatureCard from "./Components/FeatureCard/FeatureCard";
import SearchBox from "./Components/SearchBox.jsx/SearchBox";
import HowItWorksItem from "./Components/HowItWorksItem/HowItWroksItem";
import TestimonialCard from "./Components/TestimonialCard/TestimonialCard";


const Hero = () => (
  <section id="hero" className="relative isolate pt-24 pb-24 sm:pb-28 bg-gradient-to-b from-teal-50 to-white">
    <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-70"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742')" }}
    />
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 to-white" />
    <Container className="text-center mt-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
        Discover Hidden Gems of Nepal
      </h1>
      <SearchBox className="mx-auto mt-6" />
    </Container>
  </section>
);

const Featured = () => (
  <section id="explore" className="py-10 bg-white">
    <Container>
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Featured Hidden Gems</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          image="https://images.unsplash.com/photo-1642156456271-458c1d19af24?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
          tag="Gandaki"
          title="Annapurna Base Camp"
          rating={4.8}
        />
        <FeatureCard
          image="https://plus.unsplash.com/premium_photo-1723881627816-30001656c4c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R29reW8lMjBMYWtlcyUyMFRyZWt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
          tag="Koshi"
          title="Gokyo Lakes Trek"
          rating={4.7}
        />
        <FeatureCard
          image="https://images.unsplash.com/photo-1623029740976-91a889463278?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVuZ2JvY2hlJTIwTW9uYXN0ZXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900"
          tag="Koshi"
          title="Tengboche Monastery"
          rating={4.9}
        />
        <FeatureCard
          image="https://images.unsplash.com/photo-1727962861627-017ade9234f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFuZGlwdXIlMjBBbmNpZW50JTIwVmlsbGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900"
          tag="Gandaki"
          title="Bandipur Ancient Village"
          rating={4.6}
        />
      </div>
    </Container>
  </section>
);

const HowItWorks = () => (
  <section className="bg-white py-14">
    <Container>
      <h2 className="mb-10 text-center text-2xl font-bold text-slate-800">How It Works</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <HowItWorksItem
          icon={Compass}
          title="Explore"
          desc="Discover breathtaking trails, serene lakes, and hidden cultural sites."
        />
        <HowItWorksItem
          icon={Share2}
          title="Share"
          desc="Contribute your own findings and experiences with a vibrant community."
        />
        <HowItWorksItem
          icon={MapPin}
          title="Visit"
          desc="Plan your next adventure with detailed guides and local insights."
        />
      </div>
    </Container>
  </section>
);


const Testimonials = () => (
  <section className="py-14 bg-gray-50">
    <Container>
      <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">What Explorers Say</h2>
      <div className="relative">
        <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:block">
          <button className="rounded-full border border-slate-200 bg-white p-2 shadow-sm"><ChevronLeft className="h-5 w-5" /></button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TestimonialCard
            name="Priya Sharma"
            text="Unhide Nepal completely changed how I plan my trips. The hidden gems I found here were beyond my wildest dreams!"
            avatar="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop"
          />
          <TestimonialCard
            name="Rohan Gurung"
            text="The community here is amazing. Sharing my treks and getting tips from others made my journey unforgettable."
            avatar="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop"
          />
          <TestimonialCard
            name="Deepa Rai"
            text="Found the most beautiful waterfall through Unhide Nepal. It felt truly untouched. Highly recommend!"
            avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
          />
        </div>
        <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 md:block z-10">
          <button className="rounded-full border border-slate-200 bg-white p-2 shadow-sm"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </Container>
  </section>
);

const CTA = () => (
  <section id="add-place" className="bg-stone-70 py-14 text-center text-grey">
    <Container>
      <h3 className="mb-5 text-2xl font-bold">Ready to share your own hidden spot?</h3>
      <Button className="bg-amber-600 text-teal-700 hover:bg-slate-50 "><Link to="/Listing/New">Add your hidden spot</Link></Button>
    </Container>
  </section>
);

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
