import { useState } from "react";
import StarRating from "../StarRating/StarRating.jsx";

export default function ReviewItem(props) {
    const { _id, userName, reviewMsg, rating, onEdit, onDelete } = props;
    const [showMenu, setShowMenu] = useState(false);
    const [editing, setEditing] = useState(false);
    const [localName, setLocalName] = useState(userName || "");
    const [localMsg, setLocalMsg] = useState(reviewMsg || "");
    const [localRating, setLocalRating] = useState(rating || 0);
    const [hidden, setHidden] = useState(false);

    if (hidden) return null;

    const handleSave = () => {
        const updated = { ...props, userName: localName, reviewMsg: localMsg, rating: localRating };
        if (onEdit) onEdit(updated);
        else {
            setEditing(false);
        }
        setEditing(false);
    };

    const handleDelete = () => {
        if (onDelete) onDelete(_id || props.id || null);
        else {
            if (confirm("Delete review?")) setHidden(true);
        }
    };

    return (
        <div className="py-4 relative">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <div className="text-sm font-semibold text-slate-800">{localName}</div>
                    <div className="text-sm text-slate-500">{/* timestamp or meta could go here */}</div>
                </div>

                <div className="flex items-center gap-3">
                    <StarRating value={localRating} size={3.5} readonly={!editing} onChange={editing ? setLocalRating : undefined} />

                    <div className="relative">
                        <button
                            onClick={() => setShowMenu((s) => !s)}
                            className="p-1 rounded-full hover:bg-slate-100"
                            aria-label="options"
                        >
                            ⋯
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-10">
                                <button
                                    onClick={() => {
                                        setEditing(true);
                                        setShowMenu(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setShowMenu(false);
                                        handleDelete();
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-slate-50"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!editing ? (
                <p className="mt-1 text-sm text-slate-600">{localMsg}</p>
            ) : (
                <div className="mt-2 space-y-2">
                    <textarea
                        className="w-full border rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring focus:ring-amber-300"
                        value={localMsg}
                        onChange={(e) => setLocalMsg(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setEditing(false)} className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200">Cancel</button>
                        <button onClick={handleSave} className="px-3 py-1 rounded-md bg-amber-500 text-white">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
}