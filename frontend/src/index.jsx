import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
import Main from './pages/Main'
import InfoContextProvider from './Context/InfoContext'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <InfoContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Login />} /> */}
      </Routes>
    </InfoContextProvider>
  </BrowserRouter>
)
