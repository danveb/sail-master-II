import React, { useState, useEffect } from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ClubList from './components/ClubList'
import ClubDetail from './components/ClubDetail'
import VoyageList from './components/VoyageList'
import VoyageDetail from './components/VoyageDetail'
import VoyageForm from './components/VoyageForm'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Profile from './components/Profile'
import useLocalStorage from './hooks/useLocalStorage'
import UserContext from './helpers/UserContext'
import SailMasterIIApi from './API/api'
import jwt from 'jsonwebtoken'

/** Key name for storing token in localStorage. */
export const TOKEN_STORAGE_ID = "sailmaster2-token"

const App = () => {
  // useState
  const [currentUser, setCurrentUser] = useState('foo')
  const [voyage, setVoyage] = useState([])
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID) 

  // useEffect 
  useEffect(() => {
    async function getCurrentUser() {
      if(token) {
        try {
          let { username } = jwt.decode(token)
          SailMasterIIApi.token = token 
          let currentUser = await SailMasterIIApi.getCurrentUser(username)
          setCurrentUser(currentUser) 
        } catch(err) {
          console.error('App loadUserInfo: problem loading', err) 
          setCurrentUser(null) 
        }
      }
    }
    getCurrentUser() 
  }, [token])

  /** Handle user login */
  async function login(loginData) {
    try {
      let token = await SailMasterIIApi.login(loginData)
      setToken(token)
      alert('Login successful!')
      return {
        success: true
      }
    } catch(err) {
      console.error('Login failed', err)
      alert('Login failed. Please try again')
      return {
        success: false, err
      }
    }
  }

  /** Handle user signup */ 
  async function signup(signupData) {
    try {
      let token = await SailMasterIIApi.signup(signupData) 
      setToken(token)
      alert('Signup successful!')
      return {
        success: true
      }
    } catch(err) {
      console.error('Signup failed', err) 
      alert('Signup failed. Please try again')
      return {
        success: false, err
      }
    }
  }

  /** Handle user logout */
  function logout() {
    setCurrentUser(null)
    setToken(null) 
  }

  /** Handle new voyage */
  async function newVoyage(data) {
    try {
      let newVoyage = await SailMasterIIApi.newVoyage(data)
      setVoyage({...voyage, ...newVoyage}) 
      return {
        success: true 
      }
    } catch(err) {
      console.error('Adding new voyage failed', err)
      return {
        success: false, err
      }
    }
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavBar currentUser={currentUser} logout={logout} /> 
          <Routes>
              <Route path="/" element={<Home currentUser={currentUser} />}></Route>
              <Route path="/clubs" element={<ClubList />}></Route>
              <Route path="/clubs/:id" element={<ClubDetail />}></Route>
              <Route path="/voyage" element={<VoyageList currentUser={currentUser} />}></Route>
              <Route path="/voyage/:id" element={<VoyageDetail currentUser={currentUser} />}></Route>
              <Route path="/voyage/new" element={<VoyageForm currentUser={currentUser} newVoyage={newVoyage} />}></Route>
              <Route path="/signup" element={<SignupForm signup={signup} />}></Route>
              <Route path="/login" element={<LoginForm login={login} />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App