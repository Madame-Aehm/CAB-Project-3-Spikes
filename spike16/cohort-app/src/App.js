import React, { useState } from 'react';
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Navbar from './components/Navbar';
import AboutDev from './pages/AboutDev';
import AboutApp from './pages/AboutApp';
import Character from './pages/Character';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={ <Home /> }/> */}
          <Route index element={ <Home /> } />

          <Route path='character/:id' element={ <Character /> } />

          <Route path='about' element={ <About /> }>
            {/* <Route index element={ <AboutDev /> } /> */}
            <Route path='dev' element={ <AboutDev /> } />
            <Route path='app' element={ <AboutApp /> } />
          </Route>

          <Route path='*' element={ <Error404 /> }/>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
