import { Link } from "react-router-dom";
import community_work from "../assets/community-work.png";
import prayers from "../assets/prayers.png";
import orphans from "../assets/orphans.png";
import charity from "../assets/charity.png";

function Notification() {
    let notifications=[
        {
            image_url:charity,
            category:"Charity & Help",
            title:"Ruiru Charity",
            description:"2023: Helping each other"
        },
        {
            image_url:community_work,
            category:"Community & Work",
            title:"Ruiru Community",
            description:"2023: Work beyond charity"
        },
        {
            image_url:prayers,
            category:"Community & Prayers",
            title:"Ruiru Prayers",
            description:"2023: Community Prayers"
        },
        {
            image_url:orphans,
            category:"Charity & Help",
            title:"Ruiru Community",
            description:"2023: Visiting Orphanage"
        }
    ]
    return (
        <div className="flex flex-col">
            <div id="notifcation_hero_image" className="w-full h-[60vh] text-[var(--theme-gray)] flex flex-col gap-2 items-center justify-center">
                <p className="text-3xl max-sm:text-2xl font-semibold">Team Ruiru Notifications</p>
                <p className="text-xl max-sm:text-base">Check out the latest posts from our team.</p>
            </div>
            <div className="sm:p-10 max-sm:p-8">
                <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 gap-6">
                    {notifications.map((notification,index)=>(
                        <Link to={`/notification/${index}`} className="rounded-md h-fit shadow-md" key={index} title={`View more about ${notification.title}`}>
                            <img src={notification.image_url} alt={notification.title} className="rounded-t-md w-full h-[170px]"/>
                            <div className="m-4">
                                <p className="text-gray-500">{notification.category}</p>
                                <div className="font-semibold text-2xl">
                                    <p>{notification.title}</p>
                                    <p>{notification.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;