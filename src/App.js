import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch, Provider } from 'react-redux'
import store from './store';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loginpage } from './pages/Login/Loginpage';
import { Pricingpage } from './pages/Pricingpage';
import { FAQpage } from './pages/FAQpage';
import { Profilepage } from './pages/Profilepage';
import { ParcelPage } from './pages/ParcelPage';
import Layout from './Layout';
import Error404 from './pages/Error404';
import RequireAuth from './pages/RequireAuth';


// refer to this for more information on requireauth based on roles
// https://github.com/gitdagray/react_protected_routes/blob/main/src/App.js

function App() {
  return (
    <Provider store={store}>
      <main>
        <Routes>
          <Route path="/" element={<Layout />} >
            {/* Public Routes */}
            <Route path="/login" element={<Loginpage />} />
            <Route path="/" element={<Loginpage />} />
            {/* <Route path="/faq/:StatusId" element={<FAQpage />} />
            <Route path="/pricing" element={<Pricingpage />} />

            <Route path="/parcelpage" element={<ParcelPage />} /> */}

            {/* Protected Routes for Login */}
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profilepage />} />
            </Route>

            {/* Catch All  */}
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </main>
    </Provider >
  );
}

export default App;
