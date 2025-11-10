import React from "react";
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
    <div className="flex items-center justify-center md:gap-4 gap-2 overflow-x-auto py-2">
      {steps.map((s, i) => (
        <React.Fragment key={s.title}>
          <Step title={s.title} icon={s.icon} index={i} current={current} />
          {i !== steps.length - 1 && <div className="hidden sm:block h-px w-12 bg-slate-200" />}
        </React.Fragment>
      ))}
    </div>
  );
}
