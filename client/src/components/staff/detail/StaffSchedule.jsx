import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import StaffScheduleDetail from "./StaffScheduleDetail";
import StaffScheduleModal from "./StaffScheduleModal";
import { useGetData } from "../../../api/apiHooks";
import { formatDate, formatTime, usePaginate } from "../../../utils/common";
import Loading from "../../utils/Loading";
import EmptyData from "../../utils/EmptyData";

const columns = [
	{ key: "date", title: "Date", size: "w-[10%]" },
	{ key: "shift", title: "Shift", size: "w-[10%]" },
	{ key: "time", title: "Time", size: "w-[15%]" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];
export default function StaffSchedule({ staff }) {
	const { data, isPending } = useGetData(`schedule/${staff.staff_id}`, [
		"schedule",
		"get_by_staff_id",
		staff.staff_id
	]);

	const {
		currentData: schedules,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(data);

	const displayShift = ({ startTime, endTime }) => {
		const defaultStyle = "badge border-none text-white font-semibold";
		if (startTime < endTime) {
			return (
				<p className={`${defaultStyle}  bg-green-400`}>General Shift</p>
			);
		} else {
			return (
				<p className={`${defaultStyle}  bg-blue-400`}>Night Shift</p>
			);
		}
	};

	const role = localStorage.getItem("role");

	if (isPending) return <Loading />;

	return (
		<div className="w-9/12 mb-6">
			<StaffScheduleModal staff={staff} />
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					{staff.first_name} {staff.last_name}&rsquo;s Schedule
				</h1>

				{role === "Admin" && (
					<div>
						<button
							onClick={() => {
								document
									.getElementById("staff_schedule_modal")
									.showModal();
							}}
							className="btn btn-outline btn-primary"
						>
							Create Schedule
						</button>
					</div>
				)}
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
										(column.key == "shift" ||
											column.key == "time") &&
										"text-center"
									}`}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{schedules.map((data, index) => (
							<tr key={index}>
								<td className="align-top text-black font-semibold">
									{formatDate(data.date)}
								</td>
								<td className="align-top text-black flex justify-center">
									{displayShift({
										startTime: data.start_time,
										endTime: data.end_time
									})}
								</td>
								<td className="align-top text-black ">
									<p className="flex justify-center">
										{formatTime(data.start_time)} -{" "}
										{formatTime(data.end_time)}
									</p>
								</td>
								<td className="align-top text-black">
									<StaffScheduleDetail schedule={data} />
									<div
										onClick={() => {
											document
												.getElementById(
													`staff_schedule_${data.schedule_id}`
												)
												.showModal();
										}}
										className="btn btn-outline rounded-full btn-success hover:text-white"
									>
										<FontAwesomeIcon icon={faPenToSquare} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{schedules.length === 0 && (
					<EmptyData>No Schedule found.</EmptyData>
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

StaffSchedule.propTypes = {
	staff: PropTypes.object.isRequired
};
