export default function Step({ title, icon: Icon, index, current }) {
  const state = index < current ? "done" : index === current ? "current" : "todo";
  const base = "flex flex-col items-center gap-2 min-w-[84px]";
  const circle =
    state === "done"
      ? "bg-emerald-600 text-white"
      : state === "current"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : "bg-white text-slate-500 ring-1 ring-slate-200";
  return (
    <div className={base}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${circle}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-xs font-medium text-slate-600 text-center max-w-[90px] leading-tight">
        {title}
      </div>
    </div>
  );
}
