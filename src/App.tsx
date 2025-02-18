import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './store';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <AppRouter />
            <ToastContainer />
        </Provider>
    );
}

export default App;
