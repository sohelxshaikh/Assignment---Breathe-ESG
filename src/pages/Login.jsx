import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';

import earth from "../../public/images/earth.png";
import LeftCommonSide from '../component/LeftCommonSide';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before a new login attempt

        // if (password !== confirmPassword) {
        //     setError("Passwords do not match. Please try again.");
        //     return;
        // }

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
        <div className="h-screen flex select-none w-screen bg-[#21453C]">
            <div className='left relative flex items-center justify-center h-full w-[50%]'>
                {/* <div className='center pl-28 ml-20 leading-[24px] py-32 w-[80%] h-[70%]'>
                    <h4 className='text-white text-[16px] mb-3 font-normal uppercase'>Welcome to</h4>
                    <img src={logo} className='w-[401.88px]' alt="Logo" />
                    <div className='text-[#9f9f9f] mt-10 w-[75%]'>
                        <p className='mb-10'>We help you track your organization's metrics as per the ESG Guidelines</p>
                        <h5 className='text-white font-normal'>Sounds Interesting? <span className='text-[#4FA556]'>Get in touch</span></h5>
                    </div>
                </div> */}
                <LeftCommonSide/>

            </div>
            <div className="right relative flex flex-col items-center justify-center h-screen w-[50%]">
                <div className='absolute top-5 imgbox z-0 h-40 w-40'>
                    <img src={earth} alt="earth image" />
                </div>
                <div className='center text-white h-[70%] flex flex-col gap-6 z-10 mt-16 shadow-md rounded-xl py-10 px-10 w-[450px] bg-[#235E4A]'>
                    <div className='flex flex-col gap-3'>
                    <h1 className='text-white text-3xl'>Login</h1>
                    <h4 className='text-[#F3F3F3]'>Enter your registered Email ID to continue</h4>
                    </div>
                    <form onSubmit={handleSubmit} className='login-form flex gap-2 items-start justify-start flex-col'>
                        <label htmlFor="email">Email <span className='text-red-600'>*</span></label>
                        <input
                            className='p-3 w-full border-none rounded-[5px] text-black focus:outline-green-400 hover:bg-green-100'
                            type="email"
                            name="email"
                            placeholder='xyz@gmail.com'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password">Password <span className='text-red-600'>*</span></label>
                        <input
                            className='p-3 w-full border-none rounded-[5px] text-black focus:outline-green-400 hover:bg-green-100'
                            type="password"
                            placeholder='Enter Your Password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <label htmlFor="confirmPassword">Confirm Password <span className='text-red-600'>*</span></label>
                        <input
                            className='p-2 border-none rounded-[5px] text-black focus:outline-green-400 hover:bg-green-100'
                            type="password"
                            placeholder='Confirm Your Password'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        /> */}
                        <button type='button' className='w-full mt-4 bg-transparent border-2 p-2' onClick={handleGoogleLogin}>Sign In with Google</button>

                        <button type='submit'  className='w-full mt-2 bg-green-500  p-2'>Continue</button>
                        {error && <p className="error-message text-red-600">{error}</p>}
                        
                        <p>Need to create an account? <Link className='text-green-500' to="/signup">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
