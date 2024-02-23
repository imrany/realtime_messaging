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
import { GlobalContext } from "./context";
import { User } from "./types/definitions";

function App() {
  const [user,setUser]=useState<User>({
    uid:"",
    photoURL:"",
    email:"",
    displayName:"",
    phoneNumber:0,
    emailVerified:false
  })
  const [isAuth,setIsAuth]=useState(false);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log(user)
        let userData:User={
          uid:user.uid,
          photoURL:user.photoURL,
          email:user.email,
          displayName:user.displayName,
          phoneNumber:user.phoneNumber,
          emailVerified:user.emailVerified
        }
        setUser(userData)
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
      <GlobalContext.Provider value={user}>
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
      </GlobalContext.Provider>
    </BrowserRouter>
  )
}

export default App
