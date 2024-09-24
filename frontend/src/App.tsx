import React from 'react'
import './App.css'
import { Router, Routes, Route  } from 'react-router-dom';
import Home from './Page/Home';
import Selectflight from './Page/Selectflight';
import PassengerAll from './Page/PassengerAll';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/selectflight" element={<Selectflight />} />
        <Route path="/passengerall" element={<PassengerAll />} />
      </Routes>
  );
}

export default App

