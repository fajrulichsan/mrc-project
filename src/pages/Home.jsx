import React, { Fragment, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { signOut, onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../config/firebase';

const Home = () => {

  const navigate = useNavigate()

  const logout = () =>{
    signOut(auth).then(() => {
      console.log("berhasil logout");
      navigate("/login");
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        navigate("/login")
      }
    });
  }, [])
  
  return (
    <Fragment>
        <Navbar/>
        <h1>selamat datang di home page
        </h1>
        <button onClick={logout} className='bg-purple-600 p-2 rounded-full px-5 text-white'> Logout </button>
    </Fragment>
  )
}

export default Home;