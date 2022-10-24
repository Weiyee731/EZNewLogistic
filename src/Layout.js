import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HamburgerMenu from './components/Menu';
import { TopbarNav } from "./components/TopbarNav";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Layout = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#8ECAE6"
            },
            secondary: {
                main: "#023047"
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <main className="App" >
                <ToastContainer />
                <TopbarNav />
                <Outlet />
                <Footer />
            </main>
        </ThemeProvider>
    )

}

export default Layout;