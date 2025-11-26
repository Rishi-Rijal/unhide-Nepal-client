import Label from "../Shared/Label.jsx";
import Input from "../Shared/Input.jsx";
import Textarea from "../Shared/Textarea.jsx";
import CategoryDropdown from "../CategoryDropdown.jsx";
import Pill from "./Pill.jsx";
import { useFormContext } from "../contexts/NewListingFormContext.jsx";
export default function Step1Basics() {
    const { 
        form, errors, updateForm, 
        handleCategoriesChange, handleTagsChange, 
        categoryGroups, tagGroups 
    } = useFormContext();

    const allCategories = Object.values(categoryGroups).flat();
    const allTags = Object.values(tagGroups).flat();

    const toggleCategory = (value) => {
        if (form.categories.includes(value)) {
            handleCategoriesChange(form.categories.filter((c) => c !== value));
        } else {
            handleCategoriesChange([...form.categories, value]);
        }
    };

    const toggleTag = (value) => {
        if (form.tags.includes(value)) {
            handleTagsChange(form.tags.filter((t) => t !== value));
        } else {
            handleTagsChange([...form.tags, value]);
        }
    };

    return (
        <section>
            <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Tell Us About Your Spot</h2>
                <p className="text-sm text-slate-500">Share the basics so others can find this hidden gem.</p>
            </header>

            <div className="mt-6 space-y-5">
                {/* Name */}
                <div>
                    <Label htmlFor="name">Place Name</Label>
                    <Input
                        id="name"
                        value={form.name}
                        autoComplete="off"
                        onChange={(e) => updateForm({ name: e.target.value })}
                        placeholder="Everest Base Camp Trek"
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                </div>
                {/* Description */}
                <div>
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                        id="desc"
                        rows={4}
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                        placeholder="What makes it special?"
                    />
                    {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
                </div>
                
                {/* Categories and Tags */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map((cat) => (
                                <Pill
                                    key={cat}
                                    active={form.categories.includes(cat)}
                                    onClick={() => toggleCategory(cat)}
                                >
                                    {cat}
                                </Pill>
                            ))}
                        </div>
                        {errors.categories && <p className="mt-1 text-xs text-rose-600">{errors.categories}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                        {allTags.length === 0 ? (
                            <p className="text-sm text-slate-500">Pick categories first to see related tags.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag) => (
                                    <Pill
                                        key={tag}
                                        active={form.tags.includes(tag)}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Pill>
                                ))}
                            </div>
                        )}
                        {errors.tags && <p className="mt-1 text-xs text-rose-600">{errors.tags}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
}