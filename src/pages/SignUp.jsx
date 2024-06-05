import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
            <h1>Sign Up</h1>
            <form action="" onClick={handleSubmit} className='signup-form'>
                <input type="email" name="email" placeholder='xyz@gmail.com'
                    required value={email} onChange={(e) => setEmail(e.target.value)} id="" />

                <input type="password" onChange={(e) => setPassword(e.target.value)} required value={password} placeholder='Enter Your Password' />

                <button type='submit' className='signup-btn'>Sing Up</button>
                <p>Need to Login?  <Link to="/login">Login</Link> </p>


            </form>
        </div>
    )
}

export default SignUp