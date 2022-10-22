import { Outlet } from "react-router-dom";
import HamburgerMenu from './components/Menu';
import { TopbarNav } from "./components/TopbarNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <main className="App" >
            <ToastContainer />

            <TopbarNav />
            <Outlet />
        </main>
    )

}

export default Layout;