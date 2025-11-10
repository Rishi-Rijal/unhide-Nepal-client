import { Compass, Share2, MapPin } from "lucide-react";
import Container from "../Container/Container";
import HowItWorksItem from "../HowItWorksItem/HowItWorksItem";

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

export default HowItWorks;
