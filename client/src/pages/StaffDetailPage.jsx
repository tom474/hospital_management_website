import { Link, useLocation } from "react-router-dom";
import StaffSidebar from "../components/staff/detail/StaffSidebar";
import StaffInformation from "../components/staff/detail/StaffInformation";
import StaffSchedule from "../components/staff/detail/StaffSchedule";
import StaffAppointment from "../components/staff/detail/StaffAppointment";
import JobHistory from "../components/staff/detail/JobHistory";

const staff = {
	id: 1,
	jobType: "Doctor",
	firstName: "John",
	lastName: "Doe",
	manager: "Dr. Jane Smith",
	email: "JohnDoe@gmail.com",
	department: "Department 1",
	salary: 1000
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

				{option == "staff_information" && (
					<StaffInformation staff={staff} />
				)}
				{option == null && <StaffInformation staff={staff} />}
				{option == "schedule" && <StaffSchedule staff={staff} />}
				{option == "appointment" && <StaffAppointment staff={staff} />}
				{option === "job_history" && <JobHistory staff={staff} />}
			</div>
		</div>
	);
}
