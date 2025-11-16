import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "./Components/Listing/HeroSection";
import OverviewSection from "./Components/Listing/OverviewSection";
import LocationSection from "./Components/Listing/LocationSection";
import TipsSection from "./Components/Listing/TipsSection";
import GallerySection from "./Components/Listing/GallerySection";
import ReviewsSection from "./Components/Listing/ReviewsSection";
import RelatedSection from "./Components/Listing/RelatedSection";
import { getListing } from "./api/listing.api";

export default function Listing() {
  const { id } = useParams(); // /Listing/:id
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        setLoading(true);
        setError("");

        const response = await getListing(id);
        const data = response.data
        const heroImage = data.images?.[0]?.url || "";
        const galleryImages = (data.images || []).map((img) => img.url);

        const uiListing = {
          id: data._id || id,
          title: data.name,
          hero: heroImage,
          rating: data.rating || 0,
          reviewsCount: data.reviewsCount || 0,
          overview: data.description,
          tags: data.tags || [],
          locationImage: galleryImages[1] || heroImage,
          tips: [
            data.extraAdvice?.trim()
              ? { title: "Extra Advice", body: data.extraAdvice.trim() }
              : null,

            data.permitsRequired !== undefined && data.permitsRequired !== null
              ? {
                title: "Permits Required",
                body: data.permitsRequired ? "Permits required" : "No permits required",
              }
              : null,
          ].filter(Boolean)
          ,
          gallery: galleryImages,
          reviews: data.reviews || [],
          related: [],
          latitude: data.location?.coordinates?.[1],
          longitude: data.location?.coordinates?.[0],
        };

        setListing(uiListing);
      } catch (err) {
        console.error(err);
        setError("Failed to load listing.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchListing();
  }, [id]);

  function addReview(r) {
    setListing((prev) => {
      if (!prev) return prev;
      const reviews = [...(prev.reviews || []), r];
      const rating =
        reviews.reduce((s, x) => s + (x.rating || 0), 0) / reviews.length;
      return {
        ...prev,
        reviews,
        rating: Math.round(rating * 10) / 10,
        reviewsCount: (prev.reviewsCount || 0) + 1,
      };
    });
  }

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading listing...</p>
      </main>
    );
  }

  if (error || !listing) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-rose-500">{error || "Listing not found."}</p>
      </main>
    );
  }
  return (
    <main className="pt-16 bg-white">
      <HeroSection
        title={listing.title}
        hero={listing.hero}
        rating={listing.rating}
        reviewsCount={listing.reviewsCount}
      />

      <OverviewSection overview={listing.overview} tags={listing.tags} />

      <GallerySection gallery={listing.gallery} />

      <TipsSection tips={listing.tips} />

      <LocationSection
        title={listing.title}
        latitude={listing.latitude}
        longitude={listing.longitude}
      />

        <ReviewsSection reviews={listing.reviews} onAddReview={addReview} />

      <RelatedSection related={listing.related} />

      <div className="h-12" />
    </main>

  );
}
