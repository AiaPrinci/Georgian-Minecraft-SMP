import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './Page/Reg/SignUp';
import LogIn from './Page/Reg/LogIn';
import Home from './Page/Home';
import Social from './Page/Socialmedia';
import Profile from './Page/Profile';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/social' element={<Social />} />
        <Route path="/users/:userId" element={<Profile />} />
      </Routes>
    </>
  )
};

export default App;