import { Fragment } from "react";
import { Info, MapPin, Image as ImageIcon, Sparkles, FileCheck2 } from "lucide-react";
import Step from "./Step";

export default function Stepper({ current }) {
  const steps = [
    { title: "Details", icon: Info },
    { title: "Location", icon: MapPin },
    { title: "Photos", icon: ImageIcon },
    { title: "Tips", icon: Sparkles },
    { title: "Review & Submit", icon: FileCheck2 },
  ];
  return (
    <div className="flex items-center gap-3 md:gap-4 overflow-x-auto py-2 px-4 scroll-px-4 justify-start md:justify-center">
      {steps.map((s, i) => (
        <Fragment key={s.title}>
          <Step title={s.title} icon={s.icon} index={i} current={current} />
          {i !== steps.length - 1 && <div className="hidden sm:block h-px w-5 bg-slate-200" />}
        </Fragment>
      ))}
    </div>
  );
}
