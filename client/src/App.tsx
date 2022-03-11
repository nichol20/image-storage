import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { ImagePage } from './components/ImagePage/ImagePage';
import { MainPage } from './components/MainPage/MainPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/posts/:postId' element={<ImagePage />} />
    </Routes>
  );
}

export default App;
