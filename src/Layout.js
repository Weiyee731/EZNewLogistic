import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HamburgerMenu from './components/Menu';
import { TopbarNav } from "./components/TopbarNav";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <main className="App" >
            <ToastContainer />
            <TopbarNav />
            <Outlet />
            <Footer />
        </main>
    )

}

export default Layout;