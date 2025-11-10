import Badge from "../Badge/Badge";

const OverviewSection = ({ overview, tags }) => (
  <section className="py-8 max-w-5xl mx-auto px-4">
    <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
    <p className="mt-3 text-sm leading-7 text-slate-700">{overview}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((t) => (
        <Badge key={t}>{t}</Badge>
      ))}
    </div>
  </section>
);

export default OverviewSection;
