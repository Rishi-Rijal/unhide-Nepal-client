import { Container, Button } from "../../../components";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ExploreMore = () => (
  <section className="bg-gradient-to-br from-teal-50 to-amber-50 py-12">
    <Container>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Discover More Hidden Gems
        </h2>
        <p className="text-lg text-slate-600 mb-6">
          Explore our full collection of hidden spots across Nepal – from secret waterfalls to cozy cafes, ancient temples to breathtaking viewpoints.
        </p>
        <Link to="/Explore">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            Explore All Listings
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </Container>
  </section>
);

export default ExploreMore;
