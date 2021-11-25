import React, { useState, useEffect } from 'react' 
import { Routes, Route } from 'react-router-dom'
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
  const [infoLoaded, setInfoLoaded] = useState(false) 
  const [currentUser, setCurrentUser] = useState(null)
  const [voyage, setVoyage] = useState([])
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID) 

  // useEffect 
  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if(token) {
          try {
            let { username } = jwt.decode(token)
            // let username = decode.username
            SailMasterIIApi.token = token 
            let currentUser = await SailMasterIIApi.getCurrentUser(username)
            setCurrentUser(currentUser) 
          } catch(err) {
            console.error('App loadUserInfo: problem loading', err) 
            setCurrentUser(null) 
          }
        }
        setInfoLoaded(true) 
      }
      // setInfoLoaded to false while async getCurrentUser runs
      // once data is fetched this will be set to false 
      setInfoLoaded(true) 
      getCurrentUser() 
  }, [token])

  /** Handle user login */
  async function login(loginData) {
    try {
      let token = await SailMasterIIApi.login(loginData)
      setToken(token)
      return { success: true }
    } catch(errors) {
      console.error('Login failed', errors)
      return { success: false, errors }
    }
  }

  /** Handle user signup */ 
  async function signup(signupData) {
    try {
      let token = await SailMasterIIApi.signup(signupData) 
      setToken(token)
      return { success: true }
    } catch(errors) {
      console.error('Signup failed', errors) 
      return { success: false, errors}
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
      return { success: true }
    } catch(errors) {
      console.error('Adding new voyage failed', errors)
      return { success: false, errors }
    }
  }

  if(!infoLoaded) return <p>Loading...</p>
  
  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar currentUser={currentUser} logout={logout} /> 
          <Routes>
            <Route path="/" element={<App />} />
              <Route index element={<Home currentUser={currentUser} />} />
              <Route path="/clubs" element={<ClubList />} />
              <Route path="/clubs/:id" element={<ClubDetail />} />
              <Route path="/signup" element={<SignupForm signup={signup} />} />
              <Route path="/login" element={<LoginForm login={login} />} />
              <Route path="/voyage" element={<VoyageList currentUser={currentUser} />} />
                <Route path="/voyage/new" element={<VoyageForm currentUser={currentUser} newVoyage={newVoyage} />} />
                <Route path="/voyage/:id" element={<VoyageDetail currentUser={currentUser} />} />
              <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App