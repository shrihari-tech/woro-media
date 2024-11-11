import { useState } from 'react'
import SignupForm from './Signupform'
import LoginForm from './LoginForm'
import DashboardHome from './DashboardHome'
import LeadsPage from './LeadsPage'
import Sidebar from './Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path='/dashboard' element={<DashboardHome />} />
        <Route path='/leads' element={<LeadsPage />} />
      </Routes>
    </BrowserRouter>    
    </>
  )
}

export default App
