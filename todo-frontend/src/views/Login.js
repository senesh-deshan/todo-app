import { useState, useContext } from 'react'
import axios from 'axios';
import UserContext from '../contexts/UserContext.js';
import { Navigate } from 'react-router-dom';

// Defines login form layout
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const user = useContext(UserContext);
    function loginUser(e) {
        e.preventDefault();
        const data = { email, password };
        axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data, { withCredentials: true }).then(response => {
            user.setEmail(response.data.email);
            setEmail('');
            setPassword('');
            setLoginError(false);
            setRedirect(true);
        }).catch(() => {
            setLoginError(true);
        });
    }
    if (redirect) {
        return <Navigate to={'/'}></Navigate>;
    }
    return (
        <form action="" onSubmit={e => loginUser(e)}>
            {loginError && (
                <div>
                    LOGIN ERROR
                </div>
            )}
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} minLength={1}
                maxLength={20}
                required></input><br />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} minLength={1}
                maxLength={20}
                required></input><br />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;