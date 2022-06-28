import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { preloadSounds } from './assets/soundsMap';
import Home from './components/Home'
import Letters from './components/Letters';
import Numbers from './components/Numbers';
import Words from './components/Words';
import './index.css'

preloadSounds();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/numbers" element={<Numbers />} />
        <Route path="/words" element={<Words />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
