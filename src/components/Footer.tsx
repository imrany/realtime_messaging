import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer(){
    const date=new Date();
    let year=date.getFullYear()
    return(
        <footer className="flex mt-20 flex-col md:px-28 max-md:px-10 py-6 bg-[var(--theme-blue)] text-[var(--theme-gray)]">
            <div className="flex max-sm:flex-col max-sm:gap-y-6 justify-between sm:items-center pb-3 border-b-[1px] border-gray-400">
                <div className="flex flex-col gap-2 text-sm">
                    <p className="text-xl font-semibold">About Team Ruiru</p>
                    <Link to="/" className="hover:text-[var(--theme-dark)]">About</Link>
                    <Link to="/notification" className="hover:text-[var(--theme-dark)]">Notification</Link>
                    <Link to="/chat_room" className="hover:text-[var(--theme-dark)]">Our chat Room</Link>
                    <Link to="/membership" className="hover:text-[var(--theme-dark)]">Membership</Link>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                    <p className="text-xl font-semibold">Social Media</p>
                    <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--theme-dark)]">
                        <FaFacebook className="w-5 h-5"/>
                        @teamruiru
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--theme-dark)]">
                        <FaTwitter className="w-5 h-5"/>
                        @teamruiru
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--theme-dark)]">
                        <FaLinkedin className="w-5 h-5"/>
                        @teamruiru
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--theme-dark)]">
                        <FaInstagram className="w-5 h-5"/>
                        @teamruiru
                    </a>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <p>&copy; <span>Team Ruiru Portal. {year}. Ruiru, Nairobi.</span></p>
            </div>
        </footer>
    )
}