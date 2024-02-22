import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebaseConfig/config";
import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Notification from './pages/Notification';
import Login from "./pages/Login";
import Events from "./pages/Events";
import Membership from "./pages/Membership";
import Projects from "./pages/Projects";
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
          <Route index element={<About />} />
          <Route path="notification" element={<Notification />} />
          <Route path="events" element={<Events />} />
          <Route path="membership" element={<Membership />} />
          <Route path="projects" element={<Projects />} />
          <Route path="resources" element={<Resources />} />
          <Route path="chat_room" element={<ChatRoom />} />
          <Route path="songs" element={<Songs />} />
          <Route path="archives" element={<Archives />} />
          <Route path="important" element={<Important />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
