import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch, Provider } from 'react-redux'
import store from './store';
import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import HamburgerMenu from './components/Menu';
import { Registrationpage } from './pages/Registrationpage';
import { Loginpage } from './pages/Loginpage';
import { Pricingpage } from './pages/Pricingpage';
import { FAQpage } from './pages/FAQpage';
import { Profilepage } from './pages/Profilepage';


function App() {
    return (
        <Provider store={store}>
            <HamburgerMenu />
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<Loginpage />} />
                <Route exact path="/register" element={<Registrationpage />} />
                <Route exact path="/profile" element={<Profilepage />} />
                <Route exact path="/faq" element={<FAQpage />} />
                <Route exact path="/pricing" element={<Pricingpage />} />
            </Routes>
        </Provider>
    );
}

export default App;
