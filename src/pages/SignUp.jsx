import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import LeftCommonSide from '../component/LeftCommonSide';
import earth from "../../public/images/earth.png";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

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
        <div className='h-screen flex select-none w-screen bg-[#21453C]'>
            <div className="left relative flex items-center justify-center h-full w-[50%]">
                <LeftCommonSide />

            </div>
            <div className="right relative flex flex-col items-center justify-center h-screen w-[50%]">
                <div className='absolute top-5 imgbox z-0 h-40 w-40'>
                    <img src={earth} alt="earth image" />
                </div>
                <div className='center text-white h-[70%] flex flex-col gap-5 z-10 mt-10 shadow-md rounded-xl py-10 px-10 w-[450px] bg-[#235E4A]'>
                    <div className='flex flex-col '>
                        <h1 className='text-white text-3xl'>Sing Up</h1>
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
                            placeholder='Enter Your Password  (Minimum 6 character)'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <label htmlFor="confirmPassword">Confirm Password <span className='text-red-600'>*</span></label>
                        <input
                            className='p-3 w-full border-none rounded-[5px] text-black focus:outline-green-400 hover:bg-green-100'
                            type="password"
                            placeholder='Confirm Your Password'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type='submit' className='w-full mt-4 bg-transparent border-2 p-2'>Sign Up</button>
                        <button type='button' className='w-full bg-transparent border-2 p-2' onClick={handleGoogle}>Sign Up with Google</button>
                        {error && <p className="error-message text-red-600">{error}</p>}
                        <p>Need to Login? <Link className='text-green-500' to="/login">Login</Link></p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignUp;
