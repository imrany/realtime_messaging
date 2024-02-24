import { Outlet, Link, useLocation } from "react-router-dom";
import { auth, signOut } from "../firebaseConfig/config"
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";

export default function Layout(){
  const { email } =useContext(GlobalContext)
  const location=useLocation()
  async function logout(){
    try{
      await signOut(auth);
      console.log("Successfull sign out")
    }catch(error:any){
      console.log(error)
    }
  }

  let links=[
    {
      name:"About",
      to:"/"
    },
    {
      name:"Notification",
      to:"/notification"
    },
    {
      name:"Events",
      to:"/events"
    },
    {
      name:"Membership",
      to:"/membership"
    },
    {
      name:"Projects",
      to:"/projects"
    },
    {
      name:"Resources",
      to:"/resources"
    },
    {
      name:"Chat Room",
      to:"/chat_room"
    },
    {
      name:"Songs",
      to:"/songs"
    },
    {
      name:"Archives",
      to:"/archives"
    },
    {
      name:"Important",
      to:"/important"
    }
  ]
  
  useEffect(()=>{
    let header:any=document.getElementById("header")
    header.innerHTML=`
      <div class="px-2 pt-1 flex items-center justify-between">
          <p class="text-sm ml-auto">Logged in as <span class="underline text-[var(--theme-blue)]">${email}</span></p>
      </div>
      <div class="px-2 py-2 flex items-center justify-between ">
          <div class="flex gap-2 items-center">
              <img src="/uni_logo.png" alt="ruiru logo" width="30" height="30"/>
              <p class="text-lg font-semibold">Team Ruiru Portal</p>
          </div>
          <div class="flex gap-8 items-center">
          <div class="flex flex-col justify-center">
              <p class="text-[var(--theme-yellow)] font-semibold">Call Us:</p>
              <a href="tel:+254759230448" target="_blank" rel="noopener noreferrer">+254759230448</a>
          </div>

          <div class="flex flex-col justify-center">
              <p class="text-[var(--theme-yellow)] font-semibold">Email:</p>
              <a href="mailto:blacksharkchi@proton.me" target="_blank" rel="noopener noreferrer">teamruiru@gmail.com</a>
          </div>

          <div class="flex flex-col justify-center">
              <p class="text-[var(--theme-yellow)] font-semibold">Virtual Tour:</p>
              <a href="#" target="_blank" rel="noopener noreferrer">Click to Visit</a>
          </div>
          </div>
      </div>
    `
  },[location.pathname])
  return (
    <>
      <nav className="border-b-[1px] shadow-sm">
        <div className="" id="header">
          <div className="px-2 pt-1 flex items-center justify-between">
            <p className="text-sm ml-auto">Logged in as <span className="underline text-[var(--theme-blue)]">{email}</span></p>
          </div>
          <div className="px-2 py-2 flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <img src="/uni_logo.png" alt="ruiru logo" width={30} height={30}/>
              <p className="text-lg font-semibold">Team Ruiru Portal</p>
            </div>
            <div className="flex gap-8 items-center">
              <div className="flex flex-col justify-center">
                <p className="text-[var(--theme-yellow)] font-semibold">Call Us:</p>
                <a href="tel:+254759230448" target="_blank" rel="noopener noreferrer">+254759230448</a>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[var(--theme-yellow)] font-semibold">Email:</p>
                <a href="mailto:blacksharkchi@proton.me" target="_blank" rel="noopener noreferrer">teamruiru@gmail.com</a>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[var(--theme-yellow)] font-semibold">Virtual Tour:</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Click to Visit</a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-white bg-[var(--theme-blue)] pr-2">
	        {links.map((link,index)=>(<Link to={link.to} className={location.pathname===link.to?"px-2 py-3 bg-white text-[#213547]":"px-2 py-3 hover:bg-slate-200 hover:text-[#213547]"} key={index}>{link.name}</Link>))}
          <button onClick={logout} className="px-2 hover:bg-slate-200 hover:text-[#213547]">Log out</button>
        </div>
      </nav>

      <Outlet />
      <Footer/>
    </>
  )
};
