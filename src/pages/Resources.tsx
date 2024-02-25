import { useState } from "react";
import { err_toast } from "../components/Feedback";

function Resources() {
    let [disable,setDisable]=useState(false)
    async function handleUploadPdf(e:any){
        try {
            e.preventDefault()
            setDisable(true)
            let pdf=e.target.pdf.value;
            console.log(pdf)

            setDisable(false)
        } catch (error:any) {
            setDisable(false)
            err_toast(error.message)
            console.log(error)
        }
    }
    return (
        <div className="flex min-h-[60vh] flex-col p-10">
			<div>
				<p className="text-3xl max-md:text-2xl font-semibold">Resources</p>
				<p>Some of the resources at our disposal include:</p> 
				<ul style={{listStyle:'outside', margin:"0 0 0 20px"}}>
                    <li>Bible lessons.</li>
                    <li>Bible app- Swahili and English.</li>
                    <li>Spritual Teachings and lessons, example feasts, baptism </li>
                    <li>Motivation materials.</li>
                    <li>Camp items.</li>
                    <li>And other resources.</li>
                </ul>
			</div>
            <form onSubmit={handleUploadPdf} className="flex w-fit mt-10 gap-2 flex-col">
                <label className="text-xl font-semibold">Upload a PDF</label>
                <input name="pdf" id="pdf" type="file" accept=".pdf"/>
                <button disabled={disable} className={disable===true?"w-fit text-sm cursor-wait mt-2 capitalize py-2 px-6 text-white rounded-md bg-[var(--theme-dark)]":"w-fit text-sm mt-2 capitalize py-2 px-6 text-white rounded-md bg-[var(--theme-blue)]"}>Submit</button>
            </form>
        </div>
    );
};

export default Resources;