import { useState, useRef, useImperativeHandle } from "react";
import { useToast } from "../Shared/Toast";
import { Info } from "lucide-react";
import { updateTips } from "../../api/listing.api";
import { useSelector } from "react-redux";

const mapTitleToField = (title) => {
  if (title === "Extra Advice") return "extraAdvice";
  if (title === "Permits Required") return "permitsRequired";
  if (title === "Best Season") return "bestSeason";
  if (title === "Difficulty") return "difficulty";
  return null;
};

const TipsSection = ({ id, tips = [], authorId, onUpdated }, ref) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();
  const rootRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin; 
  const isOwner = (user && authorId) ? (user._id === authorId) : false;

  const startEdit = (i, t) => {
    setEditingIndex(i);
    setDraft(t.body || "");
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
        // toggle: interpret draft as yes/no
        const val = draft.toLowerCase().includes("y") || draft.toLowerCase().includes("t") || draft === "1";
        payload[field] = !!val;
      } else {
        payload[field] = draft;
      }
      await updateTips(id, payload);
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
    <section className="py-6">
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
                    <button aria-label="Edit title" title="Edit title" className="text-slate-500 hover:text-slate-700 p-1 rounded" onClick={() => startEdit(i,t)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                      </svg>
                      <span className="sr-only">Edit</span>
                    </button>
                )}
              </div>

              {editingIndex === i ? (
                <div className="mt-1">
                  <textarea rows={4} value={draft} onChange={(e) => setDraft(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm" />
                  <div className="mt-2 flex gap-2">
                    <button className="rounded bg-amber-500 text-white px-3 py-1 text-sm" onClick={() => save(i, t)} disabled={saving}>
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button className="rounded border px-3 py-1 text-sm" onClick={cancel} disabled={saving}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-slate-600">{t.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
