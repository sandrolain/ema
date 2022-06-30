import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { musicService, preloadMusic, preloadSounds } from './assets/soundsMap';
import Home from './components/Home'
import Letters from './components/Letters';
import Numbers from './components/Numbers';
import Words from './components/Words';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lettere" element={<Letters />} />
        <Route path="/numeri" element={<Numbers />} />
        <Route path="/parole" element={<Words />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

const initSounds = async () => {
  window.removeEventListener("click", initSounds);
  await preloadMusic();
  musicService.playLoop("Pixel-Puppies", {volume: 0.3});
  await preloadSounds();
};

window.addEventListener("click", initSounds);
