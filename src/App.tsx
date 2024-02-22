import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebaseConfig/config";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Notification from './pages/Notification';
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import Membership from "./pages/Membership";
import Contributions from "./pages/Contributions";
import Resources from "./pages/Resources";
import ChatRoom from "./pages/ChatRoom";
import Songs from "./pages/Songs";
import Archives from "./pages/Archives";
import Important from "./pages/Important";

function App() {
  const [isAuth,setIsAuth]=useState(false);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        // const uid = user.uid;
        console.log(user)
        setIsAuth(true)
      } else {
        // User is signed out
        console.log("user is signed out")
	      setIsAuth(false)
      }
    });
  },[isAuth]);

  return (
    <BrowserRouter>
      <ToastContainer 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Toaster/>
	    <Routes>
        <Route path="/login" element={!isAuth?<Login/>:<Navigate to="/"/>}/>
        <Route path="/" element={isAuth?<Layout />:<Navigate to="/login"/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="notification" element={<Notification />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="membership" element={<Membership />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="resources" element={<Resources />} />
          <Route path="chat_room" element={<ChatRoom />} />
          <Route path="songs" element={<Songs />} />
          <Route path="archives" element={<Archives />} />
          <Route path="important" element={<Important />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
