import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Protected from './component/Protected.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route path='/login' element={<Login/> } />
      <Route path='/signup' element={<SignUp/> } />
      <Route path='/' element={<Protected/> }>
        <Route path='/' element={<Home/>}/>
          

        </Route>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />
)
