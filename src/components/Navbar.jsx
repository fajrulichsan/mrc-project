import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {

  const [isLogin, setIsLogin] = useState(false)
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        console.log(user.uid)
      }else{
        setIsLogin(false);
      }
    });
  }, [])
  


  return (
    <div className='space-x-10 bg-gray-200 px-32 p-4'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!isLogin ? (
            <>
              <Link to="/daftar">Daftar</Link>
              <Link to="/login">Login</Link> 
            </>) : null}
    </div>
  )
}

export default Navbar;