import './App.css';
import axios from 'axios';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './views/Register';
import UserContext from './contexts/UserContext';
import Login from './views/Login';
import Home from './views/Home';

// Defines main app layout
function App() {
  const [email, setEmail] = useState('');

  // Check whether user is logged in
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/details`, { withCredentials: true }).then((response) => {
      setEmail(response.data.email);
    });
  }, []);

  // Call to logout the user who is already logged in
  function logout() {
    axios.post(`${process.env.REACT_APP_API_URL}/user/logout`, {}, { withCredentials: true }).then(() => {
      setEmail('');
    });
  }

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <div>
        <header>
          <h1>Todo App</h1>
        </header>
        <BrowserRouter>
          <nav>
            <Link to={'/'}>Home</Link>
            {/* Display navigation links based on user logged in or not*/}
            {!email && (
              <>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
              </>
            )}
            {!!email && (
              <a onClick={(e) => { e.preventDefault(); logout(); }} href="/">Log out</a>
            )}

            {/* Change the main app layout based on path user visits*/}
            <main>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
              </Routes>
            </main>
          </nav>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
