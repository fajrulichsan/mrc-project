import { Fragment, useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './pages/About';
import Daftar from './pages/Daftar';
import EmailVerifikasi from './pages/EmailVerifikasi';
import Home from './pages/Home';
import Login from './pages/Login';


function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/daftar' element={<Daftar/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/email-verifikasi' element={<EmailVerifikasi/>}/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
