import Container from "../Container/Container";

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white py-10 text-sm">
    <Container className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <p className="text-slate-500">© 2025 Unhide Nepal. All rights reserved.</p>
      <div>
        <p className="mb-2 font-semibold text-slate-800">Explore</p>
        <ul className="space-y-1 text-slate-600">
          <li><a href="#about" className="hover:text-teal-600">About Us</a></li>
          <li><a href="#contact" className="hover:text-teal-600">Contact</a></li>
          <li><a href="#privacy" className="hover:text-teal-600">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-teal-600">Terms of Service</a></li>
        </ul>
      </div>
      <div>
        <p className="mb-2 font-semibold text-slate-800">Connect</p>
        <p className="text-slate-600">Follow us on social media</p>
      </div>
    </Container>
  </footer>
);

export default Footer;