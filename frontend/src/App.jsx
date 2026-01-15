import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Page/Header';
import Home from './Page/Home';
import Footer from './Page/Footer';
import SignUp from './Page/Reg/SignUp';
import LogIn from './Page/Reg/LogIn';

const App = () => {
  const location = useLocation();

  const hideFooterRoutes = ['/signup', '/login'];

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
};

export default App;