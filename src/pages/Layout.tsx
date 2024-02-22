import { Outlet, Link, useLocation } from "react-router-dom";
import { auth, signOut } from "../firebaseConfig/config"
import Footer from "../components/Footer";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Layout(){
  let checkedItems:any=localStorage.getItem("checked_items");
  let checkedItemsParsed:string[]=JSON.parse(checkedItems);

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

  async function deleteCheckedItems(){
    try{
      checkedItemsParsed.map((checkedItem:string)=>{
        console.log(checkedItem)
      })
      window.location.reload()
    }catch(error:any){
      console.log(error.message)
    }
  }
  
  return (
    <>
      <nav className="pt-3 border-b-[1px]">
        <div className="px-2">
          {checkedItemsParsed!==null?(
            <div className="flex text-sm py-1 px-8 justify-between items-center">
              <div className="flex gap-1 items-center">
                <MdClose className="w-5 h-5 cursor-pointer" onClick={()=>localStorage.removeItem("checked_items")}/>
                <p>{checkedItemsParsed&&checkedItemsParsed.length} selected</p>
              </div>
              <button onClick={deleteCheckedItems} className="button border-[1px] border-gray-400 text-[var(--theme-blue)]">delete</button>
           </div>
          ):(
            <p className="text-lg font-semibold">Team Ruiru Portal</p>
          )}
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
