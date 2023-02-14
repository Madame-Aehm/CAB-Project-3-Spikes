import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Error404 from './pages/Error404';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/about' element={ <About /> }/>
        <Route path='*' element={ <Error404 /> }/>
      </Routes>
    </>
  );
}

export default App;
