const HowItWorksItem = ({ icon: Icon, title, desc }) => (
  <div className="text-center">
    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-600">
      <Icon className="h-7 w-7" />
    </div>
    <h3 className="mb-1 font-semibold text-slate-800">{title}</h3>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

export default HowItWorksItem;