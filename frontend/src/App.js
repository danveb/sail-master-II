import React from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ClubList from './components/ClubList'
import ClubDetail from './components/ClubDetail'
import VoyageList from './components/VoyageList'
import VoyageDetail from './components/VoyageDetail'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Profile from './components/Profile'
import Logout from './components/Logout'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/clubs" element={<ClubList />}></Route>
            <Route path="/clubs/:id" element={<ClubDetail />}></Route>
            <Route path="/voyage" element={<VoyageList />}></Route>
            <Route path="/voyage/:id" element={<VoyageDetail />}></Route>
            <Route path="/signup" element={<SignupForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App