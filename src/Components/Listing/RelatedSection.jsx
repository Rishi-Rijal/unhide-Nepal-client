import RelatedCard from "../RelatedCard/RelatedCard";

const RelatedSection = ({ related }) => (
  <section className="py-8 max-w-5xl mx-auto px-4">
    <h3 className="text-base font-semibold text-slate-900">Related Places</h3>
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {related.map((r) => (
        <RelatedCard key={r.title} {...r} />
      ))}
    </div>
  </section>
);

export default RelatedSection;
