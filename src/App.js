import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch, Provider } from 'react-redux'
import store from './store';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Provider store={store}>
      <Homepage />
    </Provider>
  );
}

export default App;
