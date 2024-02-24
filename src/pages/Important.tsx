function Important() {
    return (
        <div className="flex flex-col p-10 min-h-[60vh]">
			<div>
				<p className="text-3xl font-semibold">Our Background</p>
				<p>Team Ruiru is an empower intitive group that was founded by a small group at Ruiri in December, 2019.</p> 
				<p>We encourage membership well being, spiritual growth and bonding.</p> 
			</div>
            <div className="mt-10 text-sm">
				<p className="text-2xl text-slate-600 font-semibold">Our Achievements</p>
				<p className="text-gray-600 mb-2">We manage to achieve the following under this last year:</p>
                <ul style={{listStyle:'outside', margin:"0 0 0 20px"}}>
                    <li>Helping Orphans</li>
                    <li>Helping Old and Elder people</li>
                    <li>Contribute in Community work</li>
                    <li>Contribute to charity</li>
                    <li>And other activities</li>
                </ul>
            </div>

            <div className="mt-10 text-sm">
				<p className="text-2xl text-slate-600 font-semibold">Our Goals</p>
				<p className="text-gray-600 mb-2">Our goals and objectives are to:</p>
                <ul style={{listStyle:'outside', margin:"0 0 0 20px"}}>
                    <li>Reduce Orphan suffering</li>
                    <li>Contribute in Community work</li>
                    <li>Contribute to charity</li>
                    <li>And other activities</li>
                </ul>
            </div>
        </div>
    );
};

export default Important;