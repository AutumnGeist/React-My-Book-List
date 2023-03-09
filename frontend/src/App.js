import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Menu from './components/Menu';
import Homepage from './pages/Homepage'
import Register from './pages/Register';
import Login from './pages/Login';
import BookSearch from './pages/BookSearch';
import Profile from './pages/Profile';
import BookList from './pages/BookList';
import EditBook from './pages/EditBook';
import ForgotPW from './pages/ForgotPW';
import ResetPW from './pages/ResetPW'


function App() {
  const [showMenu, setShowMenu] = useState(true)
  
  const onOpen = () => {
    setShowMenu(!showMenu)
  }
  
  return (
    <div className="content-container">
      <Router>
        <div>
          <Menu onOpen={onOpen} showMenu={showMenu} />
        </div>
        <div className="column pt-5 mt-0" style={{ paddingLeft: showMenu && '200px'}}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgotpw' element={<ForgotPW />} />
          <Route path='/resetpw/:id/:resetToken' element={<ResetPW />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/bookList' element={<BookList />} />
          <Route path='/search' element={<BookSearch />} />
          <Route path='/edit' element={<EditBook />} />
        </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
