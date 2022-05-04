import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <>
      <ToastContainer />
      <Toolbar />
      <Routes>
        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/' element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
