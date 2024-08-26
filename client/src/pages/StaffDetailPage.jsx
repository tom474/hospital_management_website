import { Link, useParams } from "react-router-dom";
import StaffSidebar from "../components/staff/detail/StaffSidebar";
import StaffInformation from "../components/staff/detail/StaffInformation";
import StaffSchedule from "../components/staff/detail/StaffSchedule";
import StaffAppointment from "../components/staff/detail/StaffAppointment";
import JobHistory from "../components/staff/detail/JobHistory";
import { useExtractSearchParams } from "../utils/common";
import { useGetData } from "../api/apiHooks";
import Loading from "../components/utils/Loading";

export default function StaffDetailPage() {
	const option = useExtractSearchParams("option");
	const { staffId } = useParams();

	const { data: staff, isPending } = useGetData(`/staff/id/${staffId}`, [
		"staff",
		"get_by_id",
		staffId
	]);

	if (isPending) return <Loading />;
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
				<StaffSidebar staff={staff[0]} />

				{option == "staff_information" && (
					<StaffInformation staff={staff[0]} />
				)}
				{option == null && <StaffInformation staff={staff[0]} />}
				{option == "schedule" && <StaffSchedule staff={staff[0]} />}
				{option == "appointment" && (
					<StaffAppointment staff={staff[0]} />
				)}
				{option === "job_history" && <JobHistory staff={staff[0]} />}
			</div>
		</div>
	);
}
