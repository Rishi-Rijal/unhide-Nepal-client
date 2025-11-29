import { useState } from "react";
import {StarRating} from "../../../components"; 
import {FavoriteButton} from "../../../components"; 
import {LikeButton} from "../../../components"; 
import {
  updateTitle,
} from "../../../services/listing.api.js"; 
import { deleteListing } from "../../../services/listing.api.js"; 
import {ConfirmModal} from "../../../components"; 
import { useNavigate } from "react-router-dom"; 
import { useToast } from "../../../components"; 
import { useSelector } from "react-redux"; 

const HeroSection = ({ id, title, hero, rating, reviewsCount, likesCount = 0, likedByUser = false, onUpdated, authorId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title || "");
  const { showToast } = useToast();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin;
  const isOwner = (user && authorId) ? (user._id === authorId) : false;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteListing(id);
      showToast('Listing deleted', 'success');
      navigate('/Explore');
    } catch (err) {
      console.error(err);
      showToast('Failed to delete listing', 'error');
    } finally {
      setDeleteOpen(false);
    }
  };


  const saveTitle = async () => {
    if (!titleDraft || !titleDraft.trim()) {
      showToast("Title cannot be empty", "error");
      return;
    }
    try {
      await updateTitle(id, titleDraft.trim());
      if (typeof onUpdated === "function") onUpdated();
      setIsEditingTitle(false);
      showToast("Title updated", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update title", "error");
    }
  };

  const cancelEditTitle = () => {
    setIsEditingTitle(false);
    setTitleDraft(title || "");
  };



  return (
    <section className="relative isolate w-[90%] mx-auto mb-12 rounded-2xl overflow-hidden">
      <div className="relative">
        <div className="aspect-[16/7] w-full overflow-hidden rounded-2xl">
          <img src={hero} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="pb-2 mx-auto w-[90%] sm:w-[85%] md:w-[70%] lg:w-[min(70%,64rem)] -mt-8 sm:-mt-12">
          <div className="relative bg-gradient-to-b from-white/95 to-slate-50/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg ring-1 ring-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                {!isEditingTitle ? (
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 truncate">{title}</h1>
                    {(isAdmin || isOwner) && (
                      <button aria-label="Edit title" title="Edit title" className="text-slate-500 hover:text-slate-700 p-1 rounded" onClick={() => setIsEditingTitle(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                        </svg>
                        <span className="sr-only">Edit</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} className="text-xl sm:text-3xl font-extrabold text-slate-900 w-full rounded-md border px-2 py-1" />
                    <div className="mt-2 flex gap-2">
                      <button className="rounded bg-amber-500 text-white px-3 py-1 text-sm" onClick={saveTitle}>Save</button>
                      <button className="rounded border px-3 py-1 text-sm" onClick={cancelEditTitle}>Cancel</button>
                    </div>
                  </div>
                )}
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <StarRating value={rating} readonly />
                  <span className="opacity-95"> {reviewsCount} reviews</span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 mt-2 sm:mt-0">
                <FavoriteButton item={{ id: id, title }} size={18} />
                <LikeButton id={id} initialCount={likesCount} initialLiked={likedByUser} size={18} />
              </div>
            </div>

            {/** Three-dots edit menu (top-right) */}
            <div className="absolute top-3 right-3">
              {isAdmin && (
              <button
                aria-label="Open edit menu"
                onClick={() => setMenuOpen((s) => !s)}
                className="rounded-full p-1 hover:bg-slate-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-slate-600">
                  <path d="M12 8a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>)}

              {menuOpen && (
                <div className="absolute z-10 mt-2 w-44 bg-white rounded-md shadow-md ring-1 ring-slate-200">
                  <button onClick={() => { setDeleteOpen(true); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-rose-600 hover:bg-slate-50">Delete Listing</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={deleteOpen}
        title="Delete listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        confirmText="Delete"
        requireText="DELETE"
      />
    </section>

  );
};

export default HeroSection;
