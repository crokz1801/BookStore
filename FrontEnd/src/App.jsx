import React from 'react'
import Home from './components/Home/Home'
import Course from './components/Course'
import {Routes,Route , Navigate,Link} from "react-router-dom"
import Courses from './Courses/Courses'
import Signup from './components/Signup'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './content/AuthProvider.jsx'

const App = () => {
  const [authUser,setauthUser]=useAuth();
  console.log(authUser);
  return (
    <>
    {/* <Home/>
    <Course/> */}

    <div className='dark:bg-slate-900 dark:text-white'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/course" element={ authUser?<Courses/>:<Navigate to='/signup'/> } />
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    <Toaster   position="bottom-center"
  reverseOrder={false} />
    </div>
    </>
  )
}

export default App
