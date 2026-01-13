import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Page/Header';
import Home from './Page/Home';
import Footer from './Page/Footer';
import SignUp from './Page/SignUp';

const App = () => {
  const location = useLocation();

  const hideFooterRoutes = ['/signup', '/login'];

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  )
};

export default App;