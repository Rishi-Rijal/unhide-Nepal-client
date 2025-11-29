import { useState, useRef, useImperativeHandle } from "react";
import { useToast } from "../../../components";
import {Badge} from "../../../components";
import {CategoryDropdown} from "../../../components";
import GROUPS from "../../../utils/groups.js";
import { updateDescription, updateTagsAndCategories } from "../../../services/listing.api.js";
import { useSelector } from "react-redux";

const OverviewSection = ({ id, overview = "", tags = [], categories = [], onUpdated, authorId }, ref) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(overview);
  const [saving, setSaving] = useState(false);
  const rootRef = useRef(null);
  const { showToast } = useToast();
  const [editingMeta, setEditingMeta] = useState(false);
  const [localCategories, setLocalCategories] = useState(categories || []);
  const [localTags, setLocalTags] = useState(tags || []);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin;
  const isOwner = (user && authorId) ? (user._id === authorId) : false;
  const startEdit = () => {
    setValue(overview || "");
    setEditing(true);
  };

  const startEditMeta = () => {
    setLocalCategories(categories || []);
    setLocalTags(tags || []);
    setEditingMeta(true);
  };

  const cancel = () => {
    setEditing(false);
  };

  const save = async () => {
    try {
      setSaving(true);
      await updateDescription(id, value);
      if (typeof onUpdated === "function") onUpdated();
      setEditing(false);
      showToast("Description saved", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to save description", "error");
    } finally {
      setSaving(false);
    }
  };

  const saveMeta = async () => {
    try {
      setSaving(true);
      await updateTagsAndCategories(id, { categories: localCategories, tags: localTags });
      if (typeof onUpdated === "function") onUpdated();
      setEditingMeta(false);
      showToast("Tags & categories saved", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to save tags & categories", "error");
    } finally {
      setSaving(false);
    }
  };

  useImperativeHandle(ref, () => ({
    openEditor: () => {
      startEdit();
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    focusSection: () => {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  return (
    <section ref={rootRef} className="py-8">
      <div className="flex gap-3 align-items-center">
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
        {!editing && (isAdmin || isOwner) && (
          <button aria-label="Edit title" title="Edit title" className="text-slate-500 hover:text-slate-700 p-1 rounded" onClick={() => startEdit(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
            </svg>
            <span className="sr-only">Edit</span>
          </button>
        )}
        {(isAdmin || isOwner) && (
        <div className="ml-auto">
          {!editingMeta ? (
            <button onClick={startEditMeta} className="text-sm bg-amber-500 text-white px-3 py-1 rounded-md">Edit Tags & Categories</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={saveMeta} disabled={saving} className="text-sm bg-amber-500 text-white px-3 py-1 rounded-md">{saving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setEditingMeta(false)} disabled={saving} className="text-sm border px-3 py-1 rounded-md">Cancel</button>
            </div>
          )}
        </div>)}
      </div>

      {!editing ? (
        <p className="mt-3 text-sm leading-7 text-slate-700">{overview}</p>
      ) : (
        <div className="mt-3">
          <textarea
            rows={6}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
          <div className="mt-2 flex gap-2">
            <button className="rounded bg-amber-500 text-white px-3 py-1 text-sm" onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button className="rounded border px-3 py-1 text-sm" onClick={cancel} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Badge key={c} className="bg-slate-100 text-slate-800">{c}</Badge>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {editingMeta && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Categories</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.keys(GROUPS).map((g) => {
                    const active = localCategories.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          if (active) setLocalCategories(localCategories.filter((c) => c !== g));
                          else setLocalCategories([...localCategories, g]);
                        }}
                        className={`px-3 py-1 rounded-full text-sm border ${active ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-700 border-slate-200'} `}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-slate-500">Select one or more categories — tags list will be filtered to these.</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Tags</label>
                <div className="mt-2">
                  {/* Show tag selector filtered by selected categories; if none selected, show all groups */}
                  <CategoryDropdown
                    groups={
                      (localCategories && localCategories.length > 0)
                        ? Object.fromEntries(Object.entries(GROUPS).filter(([k]) => localCategories.includes(k)))
                        : GROUPS
                    }
                    value={localTags}
                    onChange={setLocalTags}
                    placeholder="Select tags"
                    widthClassName="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OverviewSection;
