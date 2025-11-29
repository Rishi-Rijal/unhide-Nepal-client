import {Hero} from "../features/home";
import {Featured} from "../features/home";
import {HowItWorks} from "../features/home";
import {CTA} from "../features/home";
// import { setUser, clearUser } from "../store/authSlice";


export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Featured />
      <HowItWorks />
      <CTA />
    </div>
  );
}
