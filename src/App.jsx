import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Govt/Auth/Login'
import Signup from './Govt/Auth/Signup'
import Home from './Govt/Pages/Home'
import DisasterDetails from './Govt/Pages/DisastreDetails'

const App = () => {
  return (
    <div>
      <Routes>

        {/* Citizen routes */}

        {/* Admin ROUTES */}
        <Route path='/admin/home' element={<Home />} />
        <Route path="/disaster/:id" element={<DisasterDetails />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
