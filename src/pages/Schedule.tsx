import Select from "react-select"
import { FaFileCsv, FaFilePdf, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
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

function Schedule() {
    let schedules=[
        {
            date:"03/12/2023",
            programme:"Community walk & Charity",
            location:"Ruiru, Nairobi"
        },
        {
            date:"03/01/2024",
            programme:"Charity & Visiting orphanage",
            location:"Ruiru, Nairobi"
        },
        {
            date:"13/02/2024",
            programme:"Sports & Marathon",
            location:"Ruiru, Nairobi"
        },
        {
            date:"15/02/2024",
            programme:"Happiness & Fun fare",
            location:"Ruiru, Nairobi"
        },
        {
            date:"18/02/2024",
            programme:"Charity & Village clean up activities",
            location:"Ruiru, Nairobi"
        },
        {
            date:"19/02/2024",
            programme:"Charity & Visiting the sick",
            location:"Ruiru, Nairobi"
        }
    ]
    function handleSort(value:string){
        console.log(value)
    }
    return (
        <div className="p-10">
            <div className="mt-8 w-full rounded-lg border-[1px] text-sm">
                <div className="flex flex-col py-6 px-8 border-b-[1px]">
                    <div className="flex justify-between items-center">
                        <p className="text-[20px] text-[var(--gray-heading)] font-semibold">Schedule / Programmes</p>
                        <button className="bg-[var(--theme-blue)] text-white flex rounded-md outline-none px-6 py-2 items-center justify-center">
                            <FaPlus className="w-4 h-4 mr-1"/>
                            <span>Add a new Schedule</span>
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
                            <th className="text-left">Date</th>
                            <th className="text-left">Programme</th>
                            <th className="text-left">Location</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm'>
                        {schedules.map((schedule,index)=>{
                            return(
                                <tr title={`#${schedule.programme}`} key={index} className="text-[#64748B] hover:bg-slate-50 cursor-pointer">
                                    <td className="text-left">
                                    <div>
                                        <input type="checkbox" className="w-5 border-gray-400 focus:bg-[var(--theme-blue)] accent-[var(--theme-blue)] cursor-pointer h-5"/>
                                    </div>
                                    </td>
                                    <td className="text-left">{schedule.date}</td>
                                    <td className="text-left">{schedule.programme}</td>
                                    <td className="text-left">{schedule.location}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Schedule;