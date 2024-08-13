import { Link, useLocation } from "react-router-dom";
import StaffSidebar from "../components/staff/detail/StaffSidebar";

const staff = {
	id: 1,
	jobType: "Doctor",
	firstName: "John",
	lastName: "Doe",
	email: "JohnDoe@gmail.com",
	department: "Cardiology",
	salary: 1000000
};

export default function StaffDetailPage() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	// Get the value of the query parameter "option" to determine which content to display
	const option = queryParams.get("option");

	return (
		<div className="mt-4">
			<div className="mb-3 ">
				<Link
					className="text-2xl  font-bold cursor-pointer transition ease-in-out hover:text-blue-600"
					to={"/staff"}
				>
					Back
				</Link>
			</div>

			<div className="flex flex-row gap-4">
				<StaffSidebar staff={staff} />

				{option == "staff_information" && <div></div>}
				{option == null && <div></div>}
				{option == "schedule" && <div></div>}
				{option == "appointment_history" && <div></div>}
			</div>
		</div>
	);
}
