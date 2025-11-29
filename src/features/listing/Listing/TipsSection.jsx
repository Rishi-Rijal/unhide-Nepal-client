import { useState, useRef, useImperativeHandle } from "react";
import { useToast } from "../../../components";   
import { Info } from "lucide-react";   
import { updateTips } from "../../../services/listing.api.js";   
import { useSelector } from "react-redux";   

// Define the available difficulty options
const DIFFICULTY_OPTIONS = ["Easy", "Moderate", "Challenging", "Extreme"];

const mapTitleToField = (title) => {
  if (title === "Extra Advice") return "extraAdvice";   
  if (title === "Permits Required") return "permitsRequired";   
  if (title === "Permit Details") return "permitsDescription";   
  if (title === "Best Season") return "bestSeason";   
  if (title === "Difficulty") return "difficulty";   
  return null;
};

const TipsSection = ({ id, tips = [], authorId, onUpdated }, ref) => {
  const [editingIndex, setEditingIndex] = useState(null);
  // draft will now hold string (for text fields/difficulty) OR boolean (for permitsRequired)
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const rootRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin; 
  const isOwner = (user && authorId) ? (user._id === authorId) : false;

  const startEdit = (i, t) => {
    setEditingIndex(i);
    const field = mapTitleToField(t.title);

    if (field === "permitsRequired") {
        setDraft(!!t.value); 
    } else if (field === "difficulty") {
        setDraft(t.value || ""); 
    } else {
        setDraft(t.body || "");
    }
  };

  const cancel = () => {
    setEditingIndex(null);
    setDraft("");
  };

  useImperativeHandle(ref, () => ({
    openEditor: (i = 0) => {
      if (!tips || tips.length === 0) return;
      const idx = Math.min(Math.max(0, i), tips.length - 1);
      startEdit(idx, tips[idx]);
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    focusSection: () => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  const save = async (i, t) => {
    const field = mapTitleToField(t.title);
    if (!field) {
      showToast("Can't edit this tip", "error");
      return;
    }
    
    try {
      setSaving(true);
      const payload = {};

      if (field === "permitsRequired") {
        payload[field] = draft; 
      } else if (field === "difficulty") {
        payload[field] = draft;
      } else {
        payload[field] = draft;
      }

      // Construct the full tips payload, including all existing tips
      const tipsPayload = {};
      tips.forEach((tip) => {
        tipsPayload[mapTitleToField(tip.title)] = tip.value;
      });
      
      const finalPayload = { ...tipsPayload, ...payload };
      await updateTips(id, finalPayload);
      
      if (typeof onUpdated === "function") onUpdated();
      cancel();
      showToast("Tip saved", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to save tip", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="py-6" ref={rootRef}>
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Info className="h-5 w-5 text-slate-500" /> Tips & Access Information
        </h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {tips.map((t, i) => (
            <div key={t.title}>
              <div className="flex gap-3 items-center">
                <div className="font-medium text-slate-800">{t.title}</div>
                {editingIndex !== i && (isAdmin || isOwner) && (
                    <button 
                        aria-label={`Edit ${t.title}`} 
                        title={`Edit ${t.title}`} 
                        className="text-slate-500 hover:text-slate-700 p-1 rounded" 
                        onClick={() => startEdit(i, t)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                      </svg>
                      <span className="sr-only">Edit</span>
                    </button>
                )}
              </div>

              {editingIndex === i ? (
                <div className="mt-1">
                  
                  {/* --- CONDITIONAL EDIT INPUTS --- */}
                  {t.title === "Permits Required" ? (
                      <div className="flex items-center pt-2">
                          <input 
                              id={`permits-required-${i}`}
                              type="checkbox"
                              checked={draft} // draft is boolean here
                              onChange={(e) => setDraft(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                          />
                          <label htmlFor={`permits-required-${i}`} className="ml-2 text-sm font-medium text-gray-700">
                              Permit Required
                          </label>
                      </div>
                  ) : t.title === "Difficulty" ? (
                      <select
                          value={draft} // draft is string here
                          onChange={(e) => setDraft(e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 mt-1 px-3 py-2 text-sm"
                      >
                          <option value="">Select Difficulty</option>
                          {DIFFICULTY_OPTIONS.map(option => (
                              <option key={option} value={option}>{option}</option>
                          ))}
                      </select>
                  ) : (
                      // Default to Textarea for other fields
                      <textarea 
                          rows={4} 
                          value={draft} // draft is string here
                          onChange={(e) => setDraft(e.target.value)} 
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 text-sm" 
                      />
                  )}
                  {/* ------------------------------- */}

                  <div className="mt-2 flex gap-2">
                    <button 
                      className="rounded bg-amber-500 text-white px-3 py-1 text-sm hover:bg-amber-600 transition" 
                      onClick={() => save(i, t)} 
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button 
                      className="rounded border border-gray-300 bg-white text-gray-700 px-3 py-1 text-sm hover:bg-gray-50 transition" 
                      onClick={cancel} 
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Displaying the current value (t.body or formatted t.value)
                <p className="mt-1 text-slate-600">
                    {t.title === "Permits Required" 
                        ? (t.value ? "Yes, a permit is required." : "No permit required.")
                        : t.body // Display t.body for text fields (Extra Advice, Best Season)
                    }
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default TipsSection;