import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Check from './backend/testing/check.jsx'
import Dashboard from './frontend/dashboard.jsx'
import Key from './frontend/key.jsx'
import Upload from './frontend/upload.jsx'
import Auth from './frontend/auth.jsx'
import Token from './frontend/token.jsx'

function App() {

  return (
    <>
       <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/check' element={<Check/>} />
        <Route path='/key' element={<Key/>} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/token' element={<Token/>} />
       </Routes>
    </>
  )
}

export default App
