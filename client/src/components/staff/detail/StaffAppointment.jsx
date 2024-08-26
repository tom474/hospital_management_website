import PropTypes from "prop-types";
import { usePaginate } from "../../../utils/common";
import { useGetData } from "../../../api/apiHooks";
import StaffAppointmentItem from "./StaffAppointmentItem";
import Loading from "../../utils/Loading";

const columns = [
	{ key: "date", title: "Date", size: "w-[10%]" },
	{ key: "doctor", title: "Doctor", size: "w-[12%]" },
	{ key: "patient", title: "Patient", size: "w-[12%]" },
	{ key: "time", title: "Time", size: "w-[12%]" },
	{ key: "status", title: "Status", size: "w-[12%]" },
	{ key: "purpose", title: "Purpose", size: "w-[13%]" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function StaffAppointment({ staff }) {
	const { data, isPending } = useGetData(
		`/appointment/staff/${staff.staff_id}`,
		["appointment", "get_by_staff_id", staff.staff_id]
	);

	const {
		currentData: appointments,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(data);

	if (isPending) return <Loading />;

	return (
		<div className="w-9/12 mb-6">
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					Staff appointment
				</h1>
			</div>

			<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
				<table className="table">
					{/* head */}
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
					<tbody>
						{appointments.map((appointment) => (
							<StaffAppointmentItem
								key={appointment.appointment_id}
								appointment={appointment}
								staff={staff}
							/>
						))}
					</tbody>
				</table>
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

StaffAppointment.propTypes = { staff: PropTypes.object.isRequired };
