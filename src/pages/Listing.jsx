import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../Components/Listing/HeroSection.jsx";
import OverviewSection from "../Components/Listing/OverviewSection.jsx";
import LocationSection from "../Components/Listing/LocationSection.jsx";
import TipsSection from "../Components/Listing/TipsSection.jsx";
import GallerySection from "../Components/Listing/GallerySection.jsx";
import ReviewsSection from "../Components/Listing/ReviewsSection.jsx";
import RelatedSection from "../Components/Listing/RelatedSection.jsx";
import { getListing } from "../api/listing.api.js";
import { addUserReview, updateReview, deleteReview } from "../api/review.api.js";
import { getRatingsByListingID } from "../api/review.api.js"
import LocationModal from "../Components/Shared/LocationModal.jsx";
import { updateLocation } from "../api/listing.api.js";
import { useToast } from "../Components/Shared/Toast.jsx";
import SuggestEditForm from "../Components/Shared/SuggestEditForm.jsx";
import Container from "../Components/Container/Container.jsx";

export default function Listing() {
  const { id } = useParams(); // /Listing/:id
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const overviewRef = useRef(null);
  const tipsRef = useRef(null);
  const galleryRef = useRef(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationDraft, setLocationDraft] = useState({ latitude: null, longitude: null });
  const { showToast } = useToast();

  async function fetchListing() {
    try {
      setLoading(true);
      setError("");

      const data = await getListing(id);
      const galleryImages = (data.images || []).map((img) => ({ url: img.url, public_id: img.public_id }));
      const uiListing = {
        locationImage: galleryImages[1]?.url || "",
        id: data._id || id,
        title: data.name,
        hero: data.coverImage || galleryImages[0]?.url || "",
        rating: data.averageRating || 0,
        reviewsCount: data.ratingsCount || 0,
        likesCount: data.likesCount || 0,
        likedByUser: data.likedByUser ?? data.liked ?? false,
        overview: data.description,
        tags: data.tags || [],
        categories: data.categories || [],
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
        ].filter(Boolean),
        gallery: galleryImages,
        reviews: data.reviews || [],
        related: [],
        latitude: data.location?.coordinates?.[1],
        longitude: data.location?.coordinates?.[0],
      };

      const reviewResponse = await getRatingsByListingID(id);
      uiListing["allReviews"] = reviewResponse.data;

      setListing(uiListing);
    } catch (err) {
      console.error(err);
      setError("Failed to load listing.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetchListing();
  }, [id]);

  async function addReview(r) {
    try {
      const result = await addUserReview({ ...r, postId: listing.id });
      const newReview = result.data;
      setListing((prev) => {
        const allReviews = [...(prev.allReviews || []), newReview];
        const ratingRaw = allReviews.reduce((s, x) => s + (x.rating || 0), 0) / allReviews.length;
        const rating = Math.round(ratingRaw * 10) / 10;
        return {
          ...prev,
          allReviews,
          rating,
          reviewsCount: (prev.reviewsCount || 0) + 1,
        };
      });
      showToast('Review added', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to add review', 'error');
    }
  }
  const editReview = async (updated) => {
    try {
      await updateReview(updated._id, { rating: updated.rating, reviewMsg: updated.reviewMsg });
      setListing((prev) => {
        const base = prev || {};
        const allReviews = (base.allReviews || []).map((r) => (r._id === updated._id ? { ...r, ...updated } : r));
        return { ...base, allReviews };
      });
      showToast('Review updated', 'success');
    } catch {
      showToast('Failed to update review', 'error');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setListing((prev) => {
        const base = prev || {};
        const allReviews = (base.allReviews || []).filter((r) => (r._id || r.id) !== reviewId);
        const reviewsCount = Math.max(0, (base.reviewsCount || 1) - 1);
        return { ...base, allReviews, reviewsCount };
      });
      showToast('Review deleted', 'success');
    } catch {
      showToast('Failed to delete review', 'error');
    }
  };



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

  const openOverviewEditor = () => overviewRef.current?.openEditor();
  const openTipsEditor = () => tipsRef.current?.openEditor();
  const openGalleryManager = () => galleryRef.current?.openManager();
  const openLocationModal = () => {
    // prefill with current listing coords
    setLocationDraft({ latitude: listing.latitude ?? '', longitude: listing.longitude ?? '' });
    setLocationModalOpen(true);
  };

  const closeLocationModal = () => setLocationModalOpen(false);

  const saveLocation = async (lat, lng) => {
    try {
      await updateLocation(listing.id, lat, lng);
      await fetchListing();
      setLocationModalOpen(false);
      showToast('Location updated', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to update location', 'error');
    }
  };

  return (
    <main className="pt-16 lg:px-4 bg-white">
      <Container>
        <HeroSection
          title={listing.title}
          id={listing.id}
          hero={listing.hero}
          rating={listing.rating}
          reviewsCount={listing.reviewsCount}
          likesCount={listing.likesCount}
          likedByUser={listing.likedByUser}
          onUpdated={fetchListing}
          onOpenOverview={openOverviewEditor}
          onOpenTips={openTipsEditor}
          onOpenGallery={openGalleryManager}
          onOpenLocation={openLocationModal}
        />

        <OverviewSection
          ref={overviewRef}
          id={listing.id}
          title={listing.title}
          overview={listing.overview}
          tags={listing.tags}
          categories={listing.categories}
          latitude={listing.latitude}
          longitude={listing.longitude}
          onUpdated={fetchListing}
        />

        <GallerySection ref={galleryRef} gallery={listing.gallery} id={listing.id} onUpdated={fetchListing} />
        <TipsSection ref={tipsRef} id={listing.id} tips={listing.tips} onUpdated={fetchListing} />

        {/* Location modal */}
        <LocationModal
          open={locationModalOpen}
          latitude={locationDraft.latitude}
          longitude={locationDraft.longitude}
          onCancel={closeLocationModal}
          onSave={saveLocation}
        />

        <LocationSection
          title={listing.title}
          latitude={listing.latitude}
          longitude={listing.longitude}
          onOpenLocation={openLocationModal}
        />

        <ReviewsSection reviews={listing.allReviews} onAddReview={addReview} onEditReview={editReview} onDeleteReview={handleDeleteReview} />

        <RelatedSection related={listing.related} />

        <SuggestEditForm listingId={listing.id} />

        <div className="h-12" />
      </Container>
    </main>

  );
}
