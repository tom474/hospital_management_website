import banner from "../assets/images/banner.png";

export default function Homepage() {
	return (
		<div className="flex flex-row gap-3 mt-5 justify-between">
			<div className="ml-4 w-6/12 flex flex-col gap-2">
				<h1 className="mt-[15%] text-blue-400 font-bold text-[40px]">
					Hospital Management System, your partner in hospital
					management
				</h1>

				<p className="mt-2 text-xl text-black">
					We are committed to providing you with the best services to
					help you manage your hospital effectively. Trust us to
					enhance operations, improve patient care, and optimize
					resources.
				</p>
			</div>
			<div className="w-6/12">
				<img
					className="w-[90%] float-right"
					src={banner}
					alt="doctor and nurse"
				/>
			</div>
		</div>
	);
}
