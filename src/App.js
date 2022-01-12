import React, { useEffect } from 'react';
import HomeScreen from './screens/home/HomeScreen';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoginScreen from './screens/login/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/profile/ProfileScreen';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else{
        dispatch(logout())
      }
    })
    return unsub
  }, [dispatch])

  return (
    <div className="app">
      <Router>
      {!user ? (
        <LoginScreen />
      ) : (
        <Routes>
          <Route path="/profile" element={<ProfileScreen />}></Route>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      )}

      </Router>
    </div>
  );
}

export default App;
