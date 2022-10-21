import { Outlet } from "react-router-dom";
import HamburgerMenu from './components/Menu';
import { TopbarNav } from "./components/TopbarNav";

const Layout = () => {
    return (
        <main className="App" >
            <TopbarNav />
            <Outlet />

        </main>
    )

}

export default Layout;