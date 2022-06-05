import { useState, useContext } from 'react'
import axios from 'axios';
import UserContext from '../contexts/UserContext.js';
import { Navigate } from 'react-router-dom';


// Defines register form layout
function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerError, setRegisterError] = useState(false)
    const [redirect, setRedirect] = useState(false)


    const user = useContext(UserContext);
    function registerUser(e) {
        e.preventDefault();
        const data = { email, password };
        axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data, { withCredentials: true }).then(response => {
            user.setEmail(response.data.email);
            setEmail('');
            setPassword('');
            setRegisterError(false);
            setRedirect(true);
        }).catch(() => {
            setRegisterError(true);
        });
    }

    if (redirect) {
        return <Navigate to={'/'}></Navigate>;
    }
    return (
        <form action="" onSubmit={e => registerUser(e)}>
            {registerError && (
                <div className='errormessage'>
                    REGISTER ERROR
                </div>
            )}
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} minLength={1}
                maxLength={20}
                required></input><br />
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} minLength={1}
                maxLength={20}
                required></input><br />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;