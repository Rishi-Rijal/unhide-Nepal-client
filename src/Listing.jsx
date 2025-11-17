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
import { addUserReview } from "./api/review.api.js";
import { getRatingsByListingID } from "./api/review.api.js"

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
          rating: data.averageRating || 0,
          reviewsCount: data.ratingsCount || 0,
          likesCount: data.likesCount || 0,
          likedByUser: data.likedByUser ?? data.liked ?? false,
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
            data.bestSeason?.trim()
              ? { title: "Best Season", body: data.bestSeason.trim() }
              : null,
            data.difficulty?.trim()
              ? { title: "Difficulty", body: data.difficulty.trim() }
              : null,
          ].filter(Boolean)
          ,
          gallery: galleryImages,
          reviews: data.reviews || [],
          related: [],
          latitude: data.location?.coordinates?.[1],
          longitude: data.location?.coordinates?.[0],
        };

        const reviewResponse = await getRatingsByListingID(id);
        uiListing.allReviews = reviewResponse.data;

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

  async function addReview(r) {
    const result = await addUserReview({ ...r, postId: listing.id });

    const newReview = result.data;

    setListing((prev) => {
      if (!prev) return prev;

      const allReviews = [...(prev.allReviews || []), newReview];

      const rating =
        allReviews.reduce((s, x) => s + (x.rating || 0), 0) / allReviews.length;

      return {
        ...prev,
        allReviews,
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
        id={listing.id}
        hero={listing.hero}
        rating={listing.rating}
        reviewsCount={listing.reviewsCount}
        likesCount={listing.likesCount}
      />

      <OverviewSection overview={listing.overview} tags={listing.tags} />

      <GallerySection gallery={listing.gallery} />

      <TipsSection tips={listing.tips} />

      <LocationSection
        title={listing.title}
        latitude={listing.latitude}
        longitude={listing.longitude}
      />

      <ReviewsSection reviews={listing.allReviews} onAddReview={addReview} />

      <RelatedSection related={listing.related} />

      <div className="h-12" />
    </main>

  );
}
