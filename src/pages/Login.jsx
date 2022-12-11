import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import {signInWithEmailAndPassword,signOut} from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';


const Login = () => {

    const navigate = useNavigate()

    const [dataUser, setDataUser] = useState({
        email : '',
        password : ''
    })

    const [errorLoginEmail, setErrorLoginEmail] = useState({
        error : false,
        errorMessage : ''
    })

    const [errorLoginPassword, setErrorLoginPassword] = useState({
        error : false,
        errorMessage : ''
    })

    // take data form
    const onChangeform = (evt) =>{
        const dataUserCopy = {...dataUser};
        dataUserCopy[evt.target.name] = evt.target.value;
        setDataUser(dataUserCopy);

        // change erorr login & password value after change form
        setErrorLoginEmail({error:false, errorMessage:''})
        setErrorLoginPassword({error:false, errorMessage:''})
    }


    // when click buton login
    const login = (e) => {

        // login to firebase
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
                switch (errorCode) {
                    case "auth/wrong-password":
                        setErrorLoginPassword({
                            error : true,
                            errorMessage : "password anda salah"
                        })
                        break;
                
                    case "auth/user-not-found":
                        setErrorLoginEmail({
                            error: true,
                            errorMessage : "email anda salah"
                        })
                        break;
                    case "auth/too-many-requests":
                        alert("terlalu banyak request, silahkan ganti")
                        break;
                }
                console.log(errorCode);
            });
        
    }

    const textTest = () =>{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("berhasil")
            }, 2000);
        })
    }

    const test = async() =>{
        const res = await textTest();
        console.log(res);
    }

  

  return (
    <Fragment>
        <Navbar/>
            <div className='w-1/4 flex flex-col p-5 bg-gray-100 mx-auto mt-60'>
                <h1 className='text-2xl font-semibold text-center'>Silahkan Login</h1>
                <form onSubmit={login} action="post" className='space-y-5'>
                    <div>
                        <p>Email</p>
                        <input onChange={(evt => onChangeform(evt))} className={`ring-1 ${errorLoginEmail.error ? 'ring-red-600' : null} w-full`} type='email' name='email' required/>
                        <span className='text-red-600 text-xs'>{errorLoginEmail.error ? errorLoginEmail.errorMessage : null}</span>
                    </div>
                    <div>
                        <p>Password </p>
                        <input onChange={(evt => onChangeform(evt))}  className={`ring-1 ${errorLoginPassword.error ? 'ring-red-600' : null} w-full`}  type='password' name='password' required/>
                        <span className='text-red-600 text-xs'>{errorLoginPassword.error ? errorLoginPassword.errorMessage : null}</span>
                    </div>
                    <button className='w-full p-2 text-white rounded-full bg-purple-400' type='submit'>Login</button>
                    
                </form>
                <button onClick={() => test()}>test</button>
            </div>
    </Fragment>
  )
}

export default Login;