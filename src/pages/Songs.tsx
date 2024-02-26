import Select from "react-select"
import { FaFileCsv, FaFilePdf, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdClose, MdDelete, MdMoreVert } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { Song } from "../types/definitions";
import { addDoc, collection, db, deleteDoc, doc, getDocs } from "../firebaseConfig/config";
import { err_toast } from "../components/Feedback";
import { GlobalContext } from "../context";

let sort_options=[
  {
    label:"Ascending",
    value:"Ascending"
  },
  {
    label:"Descending",
    value:"Descending"
  }
]

export default function Songs() {
    const { email } =useContext(GlobalContext)
    let [disable,setDisable]=useState(false);
    let [showTable,setShowTable]=useState(true);
    let [showAddSongForm,setShowAddSongForm]=useState(false)
    let [songs,seSongs]=useState<Song[]>([
        {
            youtube_link:"",
            song_name:""
        }
    ])

    async function fetchSongsFromFirebase(){
        try {
            const querySnapshot=await getDocs(collection(db,"songs"));
            let list:Song[]=[]
            querySnapshot.forEach((doc) => {
                let data={
                    id:doc.id,
                    song_name:doc.data().song_name,
                    youtube_link:doc.data().youtube_link
                }
                list.push(data)
            });
            seSongs([...list])
        } catch (error:any) {
            console.log(error)
            err_toast(error.message)
        }
    }

    function handleSort(value:string){
        console.log(value)
    }

    let checkedBoxArrayValues:string[]=[]
    async function checkedBoxHandler(e:any) {
        let header:any=document.getElementById("header")
        if(!e.target.checked){
            const index = checkedBoxArrayValues.indexOf(e.target.value);
            if (index > -1) { // only splice array when item is found
                checkedBoxArrayValues.splice(index, 1); // 2nd parameter means remove one item only
                if(checkedBoxArrayValues.length===0){
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
                    for (let i = 0; i < checkedBoxArrayValues.length; i++) {
                        const value = checkedBoxArrayValues[i];
                        let checkbox:any=document.getElementById(`checkbox_${value}`)
                        checkbox.checked=false;
                    }
                }
            }
        }else{
            checkedBoxArrayValues.push(e.target.value)
        }

        header.innerHTML=`
            <div class="flex text-sm py-1 px-8 justify-between items-center">
              <div class="flex gap-1 items-center">
                <p class="w-5 h-5 cursor-pointer" id="toggleHeader">X</p>
                <p>${checkedBoxArrayValues&&checkedBoxArrayValues.length} selected</p>
              </div>
              <button id="deleteCheckedItems" class="button border-[1px] border-gray-400 text-[var(--theme-blue)]">delete</button>
           </div>
        `
        document.getElementById("toggleHeader")?.addEventListener("click",()=>{
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
            for (let i = 0; i < checkedBoxArrayValues.length; i++) {
                const value = checkedBoxArrayValues[i];
                let checkbox:any=document.getElementById(`checkbox_${value}`)
                checkbox.checked=false;
            }
            checkedBoxArrayValues=[]
        })

        async function deleteEvent(){
            try{
                checkedBoxArrayValues.map(async (checkedItem:string)=>{
                    await deleteDoc(doc(db,"songs",checkedItem))
                })
                fetchSongsFromFirebase()
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
                for (let i = 0; i < checkedBoxArrayValues.length; i++) {
                    const value = checkedBoxArrayValues[i];
                    let checkbox:any=document.getElementById(`checkbox_${value}`)
                    checkbox.checked=false;
                }
            }catch(error:any){
                console.log(error.message)
                err_toast(error.message)
            }
        }
        document.getElementById("deleteCheckedItems")?.addEventListener("click",deleteEvent)
    }

    async function handleCreateSong(e:any) {
        try {
            e.preventDefault()
            setDisable(true)
            let member:Song={
                song_name:e.target.song_name.value,
                youtube_link:e.target.youtube_link.value,
            }
            await addDoc(collection(db,"songs"),member);
            fetchSongsFromFirebase()
            if(md_screen===false){
                setShowTable(!md_screen)
                setShowAddSongForm(false)
            }
            e.target.reset()
            setDisable(false)
        } catch (error:any) {
            setDisable(false)
            console.log(error)
            err_toast(error.message)
        }
    }

    function showDropdown(id:string){
        let dropdown:any=document.getElementById(id)
        dropdown.classList.toggle("show");
    }

    let md_screen:boolean=screen.width>930||screen.width===930?true:false;
    window.onresize=function(){
        md_screen=screen.width>930||screen.width===930?true:false
        if(showAddSongForm){
            setShowTable(md_screen)
        }
    }

    useEffect(()=>{
        fetchSongsFromFirebase()
        window.scrollTo(0,0)
    },[])
    return (
        <div className={md_screen===false?"min-h-[60vh] md:p-10 max-md:py-10 justify-center flex gap-4 max-sm:flex-wrap":"min-h-[60vh] md:p-10 max-md:py-10 flex gap-4 max-sm:flex-wrap"}>
            {showTable?(<div className="mt-8 flex-grow rounded-lg md:border-[1px] text-sm">
                <div className="flex flex-col py-6 px-8 max-md:px-4 border-b-[1px]">
                    <div className="flex justify-between items-center">
                        <p className="text-[20px] text-[var(--gray-heading)] font-semibold">Songs / Music</p>
                        <button 
                            onClick={()=>{
                                setShowAddSongForm(true)
                                setShowTable(md_screen)
                            }} 
                            className="bg-[var(--theme-blue)] text-white flex rounded-md outline-none max-md:px-3 px-6 py-2 items-center justify-center"
                        >
                            <FaPlus className="w-4 h-4 mr-1"/>
                            <span>Add a new song</span>
                        </button>
                    </div>
                    <div className={md_screen===true?"flex justify-between items-center pt-5":" none"}>
                        <form className="flex font-medium relative text-[var(--gray-heading)]">
                            <FaMagnifyingGlass className="absolute text-[var(--gray-text)] start-4 my-2 w-4 h-4"/>
                            <input id="search" required name="search" type="text" className={`items-center focus:border-[var(--theme-blue)] active:outline-[1px] focus:outline-[1px] bg-white border-[1px] rounded-md placeholder:text-[var(--gray-text)] pl-11  pr-[18px] w-full max-md:w-[150px] py-2 focus:outline-none`} placeholder="Search..."/>
                        </form>
                        <div className="flex gap-3 font-semibold text-slate-700">
                            <Select
                            className="w-[140px] placeholder:text-slate-700"
                            placeholder="Sort :"
                            options={sort_options}
                            onChange={(e:any)=>handleSort(e.value)}
                            />
                            <button className="bg-slate-200 flex rounded-md outline-none px-6 py-2 items-center justify-center">
                                <FaFilePdf className="w-4 h-4 mr-1"/>
                                <span>PDF</span>
                            </button>
                            <button className="bg-slate-200 flex rounded-md outline-none px-6 py-2 items-center justify-center">
                                <FaFileCsv className="w-4 h-4 mr-1"/>
                                <span>CSV</span>
                            </button>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr className="bg-slate-50 text-[#1e293b]"> 
                            <th className="text-left">
                                <input type="checkbox" disabled className="w-5 border-gray-400 focus:bg-[var(--theme-blue)] accent-[var(--theme-blue)] cursor-pointer h-5"/>
                            </th> 
                            <th className="text-left">Name</th>
                            <th className="text-left">Youtube Link</th>
                            {md_screen===true?<th className="text-left">Actions</th>:""}
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {songs.map((song)=>{
                            return(
                                <tr title={`#${song.song_name}`} key={song.id} className="text-[#64748B]">
                                    <td className="text-left">
                                        <input id={`checkbox_${song.id}`} type="checkbox" value={song.id} onChange={checkedBoxHandler} className="checkbox w-5 border-gray-400 focus:bg-[var(--theme-blue)] accent-[var(--theme-blue)] cursor-pointer h-5"/>
                                    </td>
                                    <td className="text-left capitalize">
                                    {screen.width<768?(
                                        <span>{song.song_name.slice(0,15)}...</span>
                                    ):(
                                        <span>{song.song_name}</span>
                                    )}
                                    </td>
                                    <td className="text-left">
                                        <a href={song.youtube_link} target="_blank" rel="noopener noreferrer" className="text-[var(--theme-blue)] underline">
                                            {screen.width<768?(<span>{song.youtube_link.slice(0,15)}...{song.youtube_link.slice(song.youtube_link.length-9,song.youtube_link.length)}</span>):(<span>{song.youtube_link}</span>)}
                                        </a>
                                    </td>
                                    {md_screen===true?<td className="text-left dropdown dropbtn" title="Actions">
                                        <div 
                                            onClick={()=>showDropdown(`myDropdown_${song.id}`)} 
                                            className="dropbtn rounded-[100px] py-3 px-2 w-fit hover:shadow-md hover:bg-gray-100 cursor-pointer"
                                        >
                                            <MdMoreVert className="w-6 h-4  dropbtn"/>
                                        </div>
                                        <div id={`myDropdown_${song.id}`} className="dropdown-content rounded-md flex flex-col text-black gap-2 py-1 bg-white">
                                            <button 
                                                onClick={async ()=>{
                                                    await deleteDoc(doc(db,"songs",`${song.id}`))
                                                    fetchSongsFromFirebase()
                                                }} 
                                                className="flex w-full py-2 px-3 hover:bg-gray-200"
                                            >
                                                <span>Delete item</span>
                                                <MdDelete title="Delete this text" className="ml-auto w-5 h-5"/>
                                            </button>
                                        </div>
                                    </td>:""}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>):""}
            {showAddSongForm?(
                <div className="mt-8 h-fit rounded-lg border-[1px] text-sm p-4 max-sm:w-[90vw] w-[50vw] lg:w-[25vw]">
                    <div className="flex justify-between items-center">
                        <p className="text-[20px] font-semibold">Add a new song</p>
                        <button 
                            title="close" 
                            onClick={()=>{
                                setShowAddSongForm(false)
                                if(md_screen===false){
                                    setShowTable(!md_screen)
                                }
                            }}
                        >
                            <MdClose className="w-5 h-5"/>
                        </button>
                    </div>
                    <form onSubmit={handleCreateSong} className="flex mt-5 flex-col text-sm">
                        <label className="mb-[8px] text-[#0f172a]" htmlFor="song_name">Name <span className="text-red-500">*</span></label>
                        <div className="pb-4">
                            <input id="song_name" name="song_name" type="text" className={`px-[10px] w-full py-2 focus:outline-[var(--theme-blue)] focus:outline-[1px] bg-white border-[1px] rounded-lg`} placeholder="Enter name of the song" required/>
                        </div>
                        <label className="mb-[8px] text-[#0f172a]" htmlFor="youtube_link"> Youtube Link <span className="text-red-500">*</span></label>
                        <div className="pb-4">
                            <input id="youtube_link" name="youtube_link" type="text" className={`px-[10px] w-full py-2 focus:outline-[var(--theme-blue)] focus:outline-[1px] bg-white border-[1px] rounded-lg`} placeholder="https://www.youtube.com/watch..." required/>
                        </div>
                        <button disabled={disable} className={disable===true?"cursor-wait mt-5 capitalize py-3 px-6 text-white rounded-md bg-[var(--theme-dark)]":"mt-5 capitalize py-3 px-6 text-white rounded-md bg-[var(--theme-blue)]"}>
                        {disable===false?(<span>
                            Submit
                        </span>):(
                            <i className="italic">Submitting...</i>
                        )}
                        </button>
                    </form>
                </div>
            ):""}
        </div>
    );
};