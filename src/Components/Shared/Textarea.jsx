export default function Textarea({ id, ...props }) {
  return (
    <textarea
      id={id}
      {...props}
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ""}`}
    />
  );
}
