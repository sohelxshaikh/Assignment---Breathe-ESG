import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before a new login attempt

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        } catch (error) {
            setError("Failed to log in. Please check your email and password.");
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            localStorage.setItem('token', data.user.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate("/");
        } catch (error) {
            setError("Failed to log in with Google.");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <input
                    type="email"
                    name="email"
                    placeholder='xyz@gmail.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Enter Your Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='login-btn'>Log In</button>
                {error && <p className="error-message">{error}</p>}
                <button type='button' onClick={handleGoogleLogin}>Log In with Google</button>
                <p>Need to create an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
    );
};

export default Login;
