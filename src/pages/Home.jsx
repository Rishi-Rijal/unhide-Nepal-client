import Hero from "../Components/Home/Hero";
import Featured from "../Components/Home/Featured";
import HowItWorks from "../Components/Home/HowItWorks";
import CTA from "../Components/Home/CTA";
import { useSelector } from "react-redux";
// import { setUser, clearUser } from "../store/authSlice";


export default function Home() {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleClick = () => {
    console.log(user);
  }
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Featured />
      <button onClick={handleClick}>Click me</button>
      <HowItWorks />
      <CTA />
    </div>
  );
}
