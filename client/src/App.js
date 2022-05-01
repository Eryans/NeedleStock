import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/views/HomePage'
import LoginPage from './components/views/Login/LoginPage'
import RegisterPage from './components/views/Login/RegisterPage'
import PrivateRoute from './components/customComponents/PrivateRoute'
import { AuthContext } from './components/context/AuthContext'
import { useState, useMemo, useEffect } from 'react'

function App() {
  const [user, setUser] = useState({})
  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser])
  useEffect(() => {
    window.localStorage["user"] && setUser(JSON.parse(window.localStorage["user"]))
  },[])
  return (
    <div className="App">
      <AuthContext.Provider value={userProvider}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
