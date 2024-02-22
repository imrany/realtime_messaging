import { FaBuilding, FaFacebook, FaPhone } from "react-icons/fa"
import { FaLocationPin } from "react-icons/fa6";
function About() {
    return (
        <div className="flex flex-col p-10">
			<div>
				<p className="text-3xl font-semibold">About Us</p>
				<p>The purpose of this website is to assist in reaching out team Ruiru members and ensuring the growth of the team.</p> 
				<p> It will enable easy follow up of contributions, members well being, spiritual growth and bonding.</p> 
			</div>

			<div className="mt-10 text-sm">
				<p className="text-2xl text-slate-600 font-semibold">Contact Us</p>
				<p className="text-gray-600 mb-12">Discuss your interest with us.</p>
				<p className="text-xl text-slate-600 font-semibold">Contact Patnerships</p>
				<div className="flex flex-col gap-3 mt-3 pb-6 text-gray-600 border-b-[1px]">
					<div className="flex items-center gap-2">
						<FaBuilding/>
						<p>Ruiri, Nairobi</p>
					</div>
					<div className="flex items-center gap-2">
						<FaLocationPin />
						<p>Team Ruiri, Nairobi</p>
					</div>
					<div className="flex items-center gap-2">
						<FaPhone />
						<a href="tel:+254734720752" target="_blank" rel="noopener noreferrer">+254734720752</a>
					</div>
					<div className="flex items-center gap-2">
						<FaFacebook />
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">@teamruiri</a>
					</div>
				</div>

				<div className="mt-6 pb-6 text-gray-600">
					<p className="text-xl text-slate-600 font-semibold">Contact Patnerships by Email</p>
					<p>If you wish to write us an email instead please use <a href="mailto:imranmat254@gmail.com" className="text-[var(--theme-blue)]" target="_blank" rel="noopener noreferrer">teamruiri@gmail.com</a></p>
				</div>
			</div>
        </div>
    );
};

export default About;
