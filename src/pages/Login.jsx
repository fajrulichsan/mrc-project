import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import {signInWithEmailAndPassword,signOut} from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate()

    const [dataUser, setDataUser] = useState({
        email : '',
        password : ''
    })

    const onChangeform = (evt) =>{
        const dataUserCopy = {...dataUser};
        dataUserCopy[evt.target.name] = evt.target.value;
        setDataUser(dataUserCopy);
    }

    const login = (e) => {
        e.preventDefault();
            signInWithEmailAndPassword(auth, dataUser.email, dataUser.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                if (!user.emailVerified) {
                    alert('email belum diverifikasi!')
                    signOut(auth).then(() => {
                        console.log("berhasil logout")
                    })
                }

                navigate("/");
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
        
    }

  

  return (
    <Fragment>
        <Navbar/>
        <h1 className='text-2xl'>ini form Login</h1>
            <div className='w-60 flex flex-col space-y-5 p-5 bg-gray-100'>
                <form onSubmit={login} action="post">
                    <div>
                        <p>Email</p>
                        <input onChange={(evt => onChangeform(evt))} className='ring-1' type='email' name='email'/><br></br>
                    </div>
                    <div>
                        <p>Password </p>
                        <input onChange={(evt => onChangeform(evt))}  className='ring-1'  type='password' name='password'/>
                    </div>
                    <button className='px-5 p-2 rounded-full bg-purple-400' type='submit'>Login</button>
                </form>
            </div>
    </Fragment>
  )
}

export default Login;