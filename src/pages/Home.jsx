import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate("")

    const handleLogout =async () => {

        await signOut(auth)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login')
    }

  return (
    <div>
        
        <h1>Welcome to home page </h1>

        <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home