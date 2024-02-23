import Select from "react-select"
import { FaFileCsv, FaFilePdf, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdClose, MdMoreVert } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { Member } from "../types/definitions";
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

export default function Membership() {
    const { email } =useContext(GlobalContext)
    let [showAddMemberForm,setShowAddMemberForm]=useState(false)
    let [members,setMembers]=useState<Member[]>([
        {
            name:"",
            email:"",
            id_number:0,
            telephone:0
        }
    ])


    async function fetchMembersFromFirebase(){
        try {
            const querySnapshot=await getDocs(collection(db,"members"));
            let list:Member[]=[]
            querySnapshot.forEach((doc) => {
                let data={
                    id:doc.id,
                    name:doc.data().name,
                    email:doc.data().email,
                    id_number:doc.data().id_number,
                    telephone:doc.data().telephone
                }
                list.push(data)
            });
            setMembers([...list])
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
                    <div class="flex items-center justify-between">
                        <p class="text-lg font-semibold">Team Ruiru Portal</p>
                        <p class="text-sm ">Logged in as <span class="underline text-[var(--theme-blue)]">${email}</span></p>
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
            <div class="flex items-center justify-between">
                <p class="text-lg font-semibold">Team Ruiru Portal</p>
                <p class="text-sm ">Logged in as <span class="underline text-[var(--theme-blue)]">${email}</span></p>
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
                    await deleteDoc(doc(db,"members",checkedItem))
                })
                fetchMembersFromFirebase()
                header.innerHTML=`
                <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold">Team Ruiru Portal</p>
                    <p class="text-sm ">Logged in as <span class="underline text-[var(--theme-blue)]">${email}</span></p>
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

    async function handleCreateMember(e:any) {
        try {
            e.preventDefault()
            let event:Member={
                id_number:e.target.id_number.value,
                email:e.target.email.value,
                name:e.target.name.value,
                telephone:e.target.telephone.value,
            }
            await addDoc(collection(db,"members"),event);
            fetchMembersFromFirebase()
            e.target.reset()
        } catch (error:any) {
            console.log(error)
            err_toast(error.message)
        }
    }

    useEffect(()=>{
        fetchMembersFromFirebase()
    },[])
    return (
        <div className="p-10 flex gap-4 max-sm:flex-wrap">
            <div className="mt-8 flex-grow rounded-lg border-[1px] text-sm">
                <div className="flex flex-col py-6 px-8 border-b-[1px]">
                    <div className="flex justify-between items-center">
                        <p className="text-[20px] text-[var(--gray-heading)] font-semibold">Members</p>
                        <button onClick={()=>setShowAddMemberForm(true)} className="bg-[var(--theme-blue)] text-white flex rounded-md outline-none px-6 py-2 items-center justify-center">
                            <FaPlus className="w-4 h-4 mr-1"/>
                            <span>Add a new member</span>
                        </button>
                    </div>
                    <div className="flex justify-between items-center pt-5">
                        <form className="flex font-medium relative text-[var(--gray-heading)]">
                            <FaMagnifyingGlass className="absolute text-[var(--gray-text)] start-4 my-2 w-4 h-4"/>
                            <input id="search" required name="search" type="text" className={`items-center focus:border-[var(--theme-blue)] active:outline-[1px] focus:outline-[1px] bg-white border-[1px] rounded-md placeholder:text-[var(--gray-text)] pl-11  pr-[18px] w-full py-2 focus:outline-none`} placeholder="Search..."/>
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
                            <th className="text-left">Telephone</th>
                            <th className="text-left">ID Number</th>
                            <th className="text-left">Email</th>
                            <th className="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {members.length!==0?members.map((member)=>{
                            return(
                                <tr title={`#${member.name}`} key={member.id} className="text-[#64748B]">
                                    <td className="text-left">
                                    <div>
                                        <input id={`checkbox_${member.id}`} type="checkbox" value={member.id} onChange={checkedBoxHandler} className="checkbox w-5 border-gray-400 focus:bg-[var(--theme-blue)] accent-[var(--theme-blue)] cursor-pointer h-5"/>
                                    </div>
                                    </td>
                                    <td className="text-left">{member.name}</td>
                                    <td className="text-left">{member.telephone}</td>
                                    <td className="text-left">{member.id_number}</td>
                                    <td className="text-left">{member.telephone}</td>
                                    <td className="text-left" title="Actions">
                                        <div className="rounded-[100px] py-3 px-2 w-fit hover:shadow-md hover:bg-gray-100 cursor-pointer">
                                            <MdMoreVert className="w-6 h-4"/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }):(
                            <tr className="flex text-sm h-[40vh] flex-col items-center justify-center">
                                <p className="">No members yet</p>
                                <button className="underline text-[var(--theme-blue)]" onClick={()=>setShowAddMemberForm(true)}>Add a member</button>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showAddMemberForm?(
                <div className="mt-8 h-fit rounded-lg border-[1px] text-sm p-4 w-[25vw]">
                    <div className="flex justify-between items-center">
                        <p className="text-[20px] font-semibold">Add a new member</p>
                        <button title="close" onClick={()=>setShowAddMemberForm(false)}>
                            <MdClose className="w-5 h-5"/>
                        </button>
                    </div>
                    <form onSubmit={handleCreateMember} className="flex mt-5 flex-col text-sm">
                        <label className="mb-[8px] text-[#0f172a]" htmlFor="name"> Full Name <span className="text-red-500">*</span></label>
                        <div className="pb-4">
                            <input id="name" name="name" type="text" className={`px-[10px] w-full py-2 focus:outline-[var(--theme-blue)] focus:outline-[1px] bg-white border-[1px] rounded-lg`} placeholder="John Doe" required/>
                        </div>
                        <label className="mb-[8px] text-[#0f172a]" htmlFor="id_number"> ID Number <span className="text-red-500">*</span></label>
                        <div className="pb-4">
                            <input id="id_number" name="id_number" type="number" className={`px-[10px] w-full py-2 focus:outline-[var(--theme-blue)] focus:outline-[1px] bg-white border-[1px] rounded-lg`} required/>
                        </div>
                        <label className="mb-[8px] text-[#0f172a]" htmlFor="email"> Email <span className="text-red-500">*</span></label>
                        <div className="pb-4">
                            <input id="email" name="email" type="email" className={`px-[10px] w-full py-2 focus:outline-[var(--theme-blue)] focus:outline-[1px] bg-white border-[1px] rounded-lg`} placeholder="johndoe@gmail.com" required/>
                        </div>
                        <label className="mb-[8px] text-[#0f172a]" htmlFor="telephone"> Telephone Number <span className="text-red-500">*</span></label>
                        <div className="pb-4">
                            <input id="telephone" name="telephone" type="tel" className={`px-[10px] w-full py-2 focus:outline-[var(--theme-blue)] focus:outline-[1px] bg-white border-[1px] rounded-lg`} placeholder="254734XXXXXX" required/>
                        </div>
                        <button className="mt-5 capitalize py-3 px-6 text-white rounded-md bg-[var(--theme-blue)]">Submit</button>
                    </form>
                </div>
            ):""}
        </div>
    );
};
