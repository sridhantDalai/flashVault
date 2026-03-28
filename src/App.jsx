import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Check from './backend/testing/check.jsx'
import Dashboard from './frontend/dashboard.jsx'

function App() {

  return (
    <>
       <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/check' element={<Check/>} />
       </Routes>
    </>
  )
}

export default App
