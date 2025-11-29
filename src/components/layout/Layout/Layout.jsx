import { Outlet } from "react-router-dom";
import { Header } from "../../../components";
import { Footer } from "../../../components";
import { CookieConsent } from "../../../components";

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
