import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Page/Header';
import Home from './Page/Home';
import Footer from './Page/Footer';

const App = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
};

export default App;