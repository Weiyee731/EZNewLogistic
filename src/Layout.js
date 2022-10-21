import { Outlet } from "react-router-dom";
import HamburgerMenu from './components/Menu';

const Layout = () => {
    return (
        <main className="App" >
            <HamburgerMenu />
            <Outlet />

        </main>
    )

}

export default Layout;