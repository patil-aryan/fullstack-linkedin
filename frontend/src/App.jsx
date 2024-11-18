import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/auth/HomePage'
import SignUpPage from './pages/auth/SignUpPage'
import LoginPage from './pages/auth/LoginPage'

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/signup" element={<SignUpPage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
        </Routes>
      </Layout>
    </div>
  )
}

export default App

