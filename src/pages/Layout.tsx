import { Outlet, Link, useLocation } from "react-router-dom";
import { auth, signOut } from "../firebaseConfig/config"
import Footer from "../components/Footer";
import { useContext } from "react";
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
  return (
    <>
      <nav className="pt-3 border-b-[1px]">
        <div className="px-2" id="header">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Team Ruiru Portal</p>
            <p className="text-sm ">Logged in as <span className="underline text-[var(--theme-blue)]">{email}</span></p>
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
