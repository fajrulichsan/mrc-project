import React, { Fragment, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
      } else {
        navigate("/login")
      }
    });
  }, [])
  return (
    <Fragment>
        <Navbar/>
        <div>ini adlaah page about</div>
    </Fragment>
  )
}

export default About;