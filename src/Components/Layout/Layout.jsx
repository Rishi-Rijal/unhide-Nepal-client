import { Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CookieConsent from "../CookieConsent/CookieConsent";

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
            <CookieConsent />
        </div>
    );
};

export default Layout;
