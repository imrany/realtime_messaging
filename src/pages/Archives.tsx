import community_work from "../assets/community-work.png";
import prayers from "../assets/prayers.png";
import orphans from "../assets/orphans.png";
import charity from "../assets/charity.png";
import { useEffect } from "react";

function Archives() {
    let archives=[
        {
            image_url:charity,
            title:"Charity & Help",
        },
        {
            image_url:community_work,
            title:"Community & Work",
        },
        {
            image_url:prayers,
            title:"Community & Prayers",
        },
        {
            image_url:orphans,
            title:"Charity & Help",
        }
    ]
    useEffect(()=>{
		window.scrollTo(0,0)
	},[])
    return (
        <div className="min-h-[60vh]">
            <div className="sm:p-10 max-sm:p-8">
                <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 gap-6">
                    {archives.map((archive,index)=>(
                        <a href={archive.image_url} target="_blank" className="hover:shadow-md rounded-md h-fit shadow-md" key={index} title={`View more about ${archive.title}`}>
                            <img src={archive.image_url} alt={archive.title} className="rounded-md  h-[220px]"/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Archives;