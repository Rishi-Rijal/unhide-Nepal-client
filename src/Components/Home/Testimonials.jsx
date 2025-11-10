import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../Container/Container";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

const Testimonials = () => (
  <section className="py-14 bg-gray-50">
    <Container>
      <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">What Explorers Say</h2>
      <div className="relative">
        <div className="absolute -left-4 top-1/2 hidden -translate-y-1/2 md:block">
          <button className="rounded-full border border-slate-200 bg-white p-2 shadow-sm" aria-label="Previous testimonial"><ChevronLeft className="h-5 w-5" /></button>
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
          <button className="rounded-full border border-slate-200 bg-white p-2 shadow-sm" aria-label="Next testimonial"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </Container>
  </section>
);

export default Testimonials;
