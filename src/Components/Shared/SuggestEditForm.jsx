import { useState } from "react";
import { useToast } from "./Toast";
import { sendSuggestion } from "../../api/listing.api";

export default function SuggestEditForm({ listingId }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      showToast('Please enter your suggestion', 'error');
      return;
    }
    setSubmitting(true);
    try {
    //   will implement later

        // const res = await sendSuggestion(listingId, form);
        const res = {}
        res.ok = true; // temp untl we have API
      if (!res.ok) {
        const text = await res.text();
        console.error('Suggest API error:', text);
        showToast('Failed to submit suggestion', 'error');
      } else {
        showToast('Suggestion submitted — thank you!', 'success');
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to submit suggestion', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6 border rounded-md bg-slate-50 mt-8">
      <h3 className="text-lg font-semibold mb-2">Suggest an Edit</h3>
      <p className="text-sm text-slate-600 mb-4">See something incorrect? Tell us what should be changed and we'll review it.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-slate-700 mb-1">Your name (optional)</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 bg-white"
            placeholder="Name"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Email (optional)</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 bg-white"
            placeholder="you@example.com"
            type="email"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Suggested changes</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 bg-white min-h-[120px]"
            placeholder="Describe what should be changed or corrected"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-60"
          >
            {submitting ? 'Sending...' : 'Send Suggestion'}
          </button>
        </div>
      </form>
    </section>
  );
}
