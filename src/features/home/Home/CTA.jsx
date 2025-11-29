import {Container} from "../../../components";
import {Button} from "../../../components";
import { Link } from "react-router-dom";

const CTA = () => (
  <section id="add-place" className="bg-stone-70 py-14 text-center text-grey">
    <Container>
      <h3 className="mb-5 text-2xl font-bold">Ready to share your own hidden spot?</h3>
      <Button className="bg-amber-600 text-teal-700 hover:bg-slate-50 "><Link to="/Listing/New">Add your hidden spot</Link></Button>
    </Container>
  </section>
);

export default CTA;
