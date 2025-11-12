
import { useState } from "react";
import HeroSection from "./Components/Listing/HeroSection";
import OverviewSection from "./Components/Listing/OverviewSection";
import LocationSection from "./Components/Listing/LocationSection";
import TipsSection from "./Components/Listing/TipsSection";
import GallerySection from "./Components/Listing/GallerySection";
import ReviewsSection from "./Components/Listing/ReviewsSection";
import RelatedSection from "./Components/Listing/RelatedSection";

export default function Listing() {
  const [listing, setListing] = useState({
    id: "annapurna-abc",
    title: "Annapurna Base Camp",
    hero:
      "https://images.unsplash.com/photo-1642156456271-458c1d19af24?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFubmFwdXJuYSUyMGJhc2UlMjBjYW1wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
    rating: 4.8,
    reviewsCount: 980,
    overview:
      "Annapurna Base Camp (ABC) trek is one of the most popular treks in the Annapurna region. It is a spectacular journey through diverse landscapes and cultures, leading to the base of the mighty Annapurna.",
    tags: ["Trekking", "Adventure", "Nature"],
    locationImage:
      "https://images.unsplash.com/photo-1549880181-56a44cf4a9a7?q=80&w=1600&auto=format&fit=crop",
    tips: [
      {
        title: "Transport",
        body:
          "Drive from Pokhara to Siwai (1.5–2 hrs). Bus to Nayapul also works.",
      },
      {
        title: "Permits",
        body: "ACAP & TIMS card required; obtainable in Pokhara/Kathmandu.",
      },
      {
        title: "Distance",
        body: "Approx. 85–115 km / 7–10 days (out from Pokhara).",
      },
      {
        title: "Local Homestays",
        body: "Find homestays in *Ghandruk*, *Chhomrong*, *Sinuwa*.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519680772-8bba63c6f61e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602459040017-9d2f0ba6727b?q=80&w=1200&auto=format&fit=crop",
    ],
    reviews: [
      {
        author: "trekkermom_ne",
        text:
          "Absolutely stunning views and a challenging but rewarding trek! Highly recommend.",
        rating: 5,
      },
      {
        author: "adventurer_chris",
        text:
          "The ABC route was incredible. The views are unmatched. Make sure to pack warm clothes!",
        rating: 4,
      },
    ],
    related: [
      {
        image:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
        title: "Everest Base Camp",
        rating: 4.6,
        reviews: 1200,
      },
      {
        image:
          "https://images.unsplash.com/photo-1519681394-2fbb3bfb60b0?q=80&w=1200&auto=format&fit=crop",
        title: "Langtang Valley",
        rating: 4.5,
        reviews: 570,
      },
      {
        image:
          "https://images.unsplash.com/photo-1549893079-842a07a8d1a8?q=80&w=1200&auto=format&fit=crop",
        title: "Upper Mustang",
        rating: 4.4,
        reviews: 680,
      },
    ],
  });

  function addReview(r) {
    setListing((prev) => {
      const reviews = [...prev.reviews, r];
      const rating = reviews.reduce((s, x) => s + (x.rating || 0), 0) / reviews.length;
      return { ...prev, reviews, rating: Math.round(rating * 10) / 10, reviewsCount: (prev.reviewsCount || 0) + 1 };
    });
  }

  return (
    <main className="bg-white">
      <HeroSection
        title={listing.title}
        hero={listing.hero}
        rating={listing.rating}
        reviewsCount={listing.reviewsCount}
      />
      <OverviewSection overview={listing.overview} tags={listing.tags} />
      <LocationSection locationImage={listing.locationImage} title={listing.title} />
      <TipsSection tips={listing.tips} />
      <GallerySection gallery={listing.gallery} />
      <ReviewsSection reviews={listing.reviews} onAddReview={addReview} />
      <RelatedSection related={listing.related} />
      <div className="h-12" />
    </main>
  );
}
