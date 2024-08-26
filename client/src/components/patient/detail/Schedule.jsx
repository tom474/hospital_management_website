import PropTypes from "prop-types";
import { usePaginate } from "../../../utils/common";
import { useGetData } from "../../../api/apiHooks";
import Loading from "../../utils/Loading";
import ScheduleItem from "./ScheduleItem";
import EmptyData from "../../utils/EmptyData";

const columns = [
	{ key: "date", title: "Date", size: "w-[10%]" },
	{ key: "doctor", title: "Doctor", size: "w-[12%]" },
	{ key: "patient", title: "Patient", size: "w-[12%]" },
	{ key: "time", title: "Time", size: "w-[12%]" },
	{ key: "status", title: "Status", size: "w-[12%]" },
	{ key: "purpose", title: "Purpose", size: "w-[13%]" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function Schedule({ patient }) {
	const patientName = patient.first_name + " " + patient.last_name;
	const { data: appointment, isPending: isPendingAppointment } = useGetData(
		`/appointment/patient/${patient.patient_id}`,
		["appointment", "get_by_patient_id", patient.patient_id]
	);

	const {
		currentData: currentAppointment,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(appointment);

	if (isPendingAppointment) return <Loading />;

	return (
		<div className="w-9/12 mb-6">
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					Patient Appointment
				</h1>
			</div>

			<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
				<table className="table">
					<thead>
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`${
										column.size
									} text-blue-500 text-base ${
										column.key == "status" && "text-center"
									}`}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>

					{currentAppointment.length > 0 && (
						<tbody>
							{currentAppointment.map((appointment) => (
								<ScheduleItem
									appointment={appointment}
									key={appointment.appointment_id}
									patientName={patientName}
								/>
							))}
						</tbody>
					)}
				</table>
				{currentAppointment.length === 0 && (
					<EmptyData>No appointment found.</EmptyData>
				)}
			</div>
			<div className="flex justify-end mb-5 mt-2">
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => paginate(i + 1)}
						className={`px-3 py-1 mx-1 ${
							currentPage === i + 1
								? "bg-blue-400 text-white"
								: "bg-gray-200"
						} rounded`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
}

Schedule.propTypes = { patient: PropTypes.object.isRequired };
