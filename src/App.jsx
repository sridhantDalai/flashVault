import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './frontend/dashboard.jsx'
import Key from './frontend/key.jsx'
import Upload from './frontend/upload.jsx'
import Auth from './frontend/auth.jsx'
import Token from './frontend/token.jsx'
import Load from './frontend/load.jsx'
import { ProtectedRoute } from './frontend/components.jsx'
import Env from './frontend/env.jsx'
import DashboardTemp from './frontend/dashboardTemp.jsx'

function App() {

  return (
    <>
       <Routes>

        <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } />


        <Route path='/key' element={
            <ProtectedRoute>
              <Key/>
            </ProtectedRoute>
          } />

        <Route path='/upload' element={
            <ProtectedRoute>
              <Upload/>
            </ProtectedRoute>          
        } />

        <Route path='/' element={<Auth/>} />
        <Route path='/load' element={<Load/>} />

        <Route path='/token' element={
            <ProtectedRoute>
              <Token/>
            </ProtectedRoute>          
        } />

         {/* env LOG IN */}
         <Route path='/env' element={<Env/>} />
         <Route path='/dashboardTemp' element={<DashboardTemp/>} />

       </Routes>
    </>
  )
}

export default App
