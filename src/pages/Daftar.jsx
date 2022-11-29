import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { auth } from '../config/firebase';


const Daftar = () => {

  const [userIsUse, setUserIsUse] = useState(false);

  const [dataUser, setDataUser] = useState({
    email : '',
    password : ''
  })

  const onChangeform = (evt) =>{
    const dataUserCopy = {...dataUser};
    dataUserCopy[evt.target.name] = evt.target.value;
    setDataUser(dataUserCopy);

    // user is use
    setUserIsUse(false)
  }

  const daftar = (e) => {
    e.preventDefault();
      createUserWithEmailAndPassword(auth, dataUser.email, dataUser.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('berhasil');
          sendEmailVerification(auth.currentUser)
            .then(() => {
              alert("email verfikasi sudah di kirim");

            })
            .catch((error) =>{
              console.log(error)
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            setUserIsUse(true);
          }
        });
  }

  useEffect(() => {
    // user is use
    setUserIsUse(false)
  }, [])  
  

  return (
    <Fragment>
        <Navbar/>
        <div>ini form daftar</div>
        <form onSubmit={daftar} action="post">
            Email : <input onChange={(evt => onChangeform(evt))} className='ring-1' type='email' name='email'/><br></br>
            <span className='text-red-600'>{userIsUse ? 'email sudah dipakai' : null}</span><br></br>
            Password : <input onChange={(evt => onChangeform(evt))}  className='ring-1'  type='password' name='password'/>
            <button type='submit'>Daftar</button>
        </form>
    </Fragment>
  )
}

export default Daftar;