import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Notification from './pages/Notification';
import Login from "./pages/Login";
import { useState } from "react";
import { auth, onAuthStateChanged } from "./firebaseConfig/config";

function App() {
  const [isAuth,setIsAuth]=useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log(uid)
      setIsAuth(true)
    } else {
      // User is signed out
      console.log("user is signed out")
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuth?<Login/>:<Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={isAuth?<Layout />:<Navigate to="/dashboard"/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="notification" element={<Notification />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
