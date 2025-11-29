
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GROUPS from "../utils/groups.js";
import { createListing } from '../services';

const uniq = (arr) => Array.from(new Set(arr));
const tagsFor = (categories) => uniq(categories.flatMap((c) => GROUPS[c] || []));

const initialFormState = {
    name: "",
    description: "",
    categories: [],
    tags: [],
    latitude: "",
    longitude: "",
    photos: [],
    tips: {
        permitsRequired: false,
        permitsDescription: "",
        bestSeason: "",
        difficulty: "",
        extraAdvice: "",
    },
};

function useNewListingForm() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const parseNumberOrNull = (value) => {
        const n = Number(value);
        return value === "" || Number.isNaN(n) ? null : n;
    };

    const categoryGroups = useMemo(() => ({ Categories: Object.keys(GROUPS) }), []);
    const tagGroups = useMemo(() => {
        if (form.categories.length === 0) return {};
        const out = {};
        form.categories.forEach((c) => {
            out[c] = GROUPS[c] || [];
        });
        return out;
    }, [form.categories]);

    const updateForm = (updates) => {
        setForm(prev => ({ ...prev, ...updates }));
    };

    const updateTips = (updates) => {
        setForm(prev => ({ ...prev, tips: { ...prev.tips, ...updates } }));
    };

    const handleCategoriesChange = (nextCategories) => {
        const validTags = tagsFor(nextCategories);
        setForm((prev) => ({
            ...prev,
            categories: nextCategories,
            tags: prev.tags.filter((t) => validTags.includes(t)), // Prune invalid tags
        }));
    };

    const handleTagsChange = (nextTags) => {
        const valid = tagsFor(form.categories);
        setForm((prev) => ({
            ...prev,
            tags: nextTags.filter((t) => valid.includes(t)), // Guard against stale/invalid tags
        }));
    };

    function validateStep(s) {
        const errs = {};
        if (s === 0) {
            if (!form.name || !form.name.trim()) errs.name = "Please enter a name.";
            if (!form.description || !(form.description.trim().length > 8)) errs.description = "Please enter a description (at least 10 characters).";
            if (!form.categories || form.categories.length === 0) errs.categories = "Please select at least one category.";
            if (!form.tags || form.tags.length === 0) errs.tags = "Please select at least one tag.";

        }
        if (s === 1) {
            if (!form.latitude || Number.isNaN(Number(form.latitude))) errs.latitude = "Valid latitude required.";
            if (!form.longitude || Number.isNaN(Number(form.longitude))) errs.longitude = "Valid longitude required.";
        }
        if (s === 2) {
            if (!form.photos || form.photos.length === 0) errs.photos = "Please upload at least one photo.";
        }
        if (s === 3) {
            if (!form.tips || !form.tips.difficulty) errs.difficulty = "Please select difficulty.";
        }
        return errs;
    }


    function next() {
        const errs = validateStep(step);
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }
        setErrors({});
        setStep((s) => Math.min(s + 1, 4));
    }

    function back() {
        setStep((s) => Math.max(s - 1, 0));
    }

    async function handleSubmit() {
        setSubmitting(true);
        const allErrs = {
            ...validateStep(0),
            ...validateStep(1),
            ...validateStep(2),
            ...validateStep(3),
        };

        if (Object.keys(allErrs).length) {
            setErrors(allErrs);
            // jump to first errored step
            if (allErrs.name || allErrs.description || allErrs.tags || allErrs.categories) setStep(0);
            else if (allErrs.latitude || allErrs.longitude) setStep(1);
            else if (allErrs.photos) setStep(2);
            else if (allErrs.difficulty) setStep(3);
            setSubmitting(false);
            return;
        }
        setErrors({});

        try {
            await createListing(form);
            navigate("/Explore");
        } catch (error) {
            console.error("Failed to create listing:", error);
        } finally {
            setSubmitting(false);
        }
    }

    return {
        step,
        form,
        errors,
        submitting,
        next,
        back,
        handleSubmit,
        updateForm,
        updateTips,
        handleCategoriesChange,
        handleTagsChange,
        categoryGroups,
        tagGroups,
        parseNumberOrNull // Exposed for map view rendering
    };
}

export default useNewListingForm;
export { useNewListingForm };