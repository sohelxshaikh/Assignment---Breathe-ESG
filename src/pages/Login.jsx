import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            const user = userCredential.user;
            localStorage.setItem('token',user.accessToken);
            localStorage.setItem('user',JSON.stringify(user));
            navigate("/")

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <h1>Log In</h1>
            <form action="" onClick={handleSubmit} className='login-form'>
                <input type="email" name="email" placeholder='xyz@gmail.com'
                    required value={email} onChange={(e) => setEmail(e.target.value)} id="" />

                <input type="password" onChange={(e) => setPassword(e.target.value)} required value={password} placeholder='Enter Your Password' />

                <button type='submit' className='login-btn'>LogIn</button>
                <p>Need to Create account?  <Link to="/signup">sign up</Link> </p>


            </form>
        </div>
    )
}

export default Login