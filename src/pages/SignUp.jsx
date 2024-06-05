import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogle = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
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
                <button type='submit' className='signup-btn'>Sign Up</button>
                <button type='button' onClick={handleGoogle}>Sign Up with Google</button>
                <p>Need to Login? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;
