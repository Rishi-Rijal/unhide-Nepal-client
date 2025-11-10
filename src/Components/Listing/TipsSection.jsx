import { Info } from "lucide-react";

const TipsSection = ({ tips }) => (
  <section className="py-6 max-w-5xl mx-auto px-4">
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
        <Info className="h-5 w-5 text-slate-500" /> Tips & Access Information
      </h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        {tips.map((t) => (
          <div key={t.title}>
            <div className="font-medium text-slate-800">{t.title}</div>
            <p className="mt-1 text-slate-600">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TipsSection;
