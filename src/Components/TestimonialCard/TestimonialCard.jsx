import { Quote } from "lucide-react";

const TestimonialCard = ({ name, text, avatar }) => (
  <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <Quote className="absolute -top-4 left-6 h-8 w-8 text-teal-300" />
    <p className="mt-2 text-sm text-slate-700">“{text}”</p>
    <div className="mt-5 flex items-center gap-3">
      <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <p className="text-sm font-medium text-slate-900">{name}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;