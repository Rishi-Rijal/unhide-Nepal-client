import FeatureCard from "../FeatureCard/FeatureCard.jsx";
import Container from "../Container/Container.jsx";
import { getFilteredListings } from "../../api/listing.api.js";

async function fetchFeaturedListings() {
  try {
    const featuredListings = await getFilteredListings({ limit: 4 });
    return featuredListings.data;
  } catch (error) {
    return [];
  }
}
const listings = await fetchFeaturedListings();
const Featured = () => {
  return (
    <section id="explore" className="py-10 bg-white">
      <Container>
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Featured Gems</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {listings && listings.map((listing) => (
            <FeatureCard
              key={listing._id}
              id={listing._id}
              image={listing.images && listing.images.length > 0 ? listing.images[0]["url"] : 'https://via.placeholder.com/300'}
              tag={listing.physicalAddress?.substring(0, listing.physicalAddress?.lastIndexOf(",")) || 'Unknown'}
              title={listing.name}
              rating={listing.rating || 0}
            />
          ))}
        </div>
      </Container>
    </section>
  )
};

export default Featured;
