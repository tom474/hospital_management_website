import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import StaffScheduleDetail from "./StaffScheduleDetail";
import StaffScheduleModal from "./StaffScheduleModal";

const mockData = [
	{
		id: 1,
		dayOfWeek: "Monday",
		shift: "General Shift",
		startTime: "08:00",
		endTime: "17:00"
	},
	{
		id: 2,
		dayOfWeek: "Tuesday",
		shift: "General Shift",
		startTime: "08:00",
		endTime: "17:00"
	},
	{
		id: 3,
		dayOfWeek: "Wednesday",
		shift: "Night Shift",
		startTime: "18:00",
		endTime: "02:00"
	},
	{
		id: 4,
		dayOfWeek: "Thursday",
		shift: "General Shift",
		startTime: "08:00",
		endTime: "17:00"
	},
	{
		id: 5,
		dayOfWeek: "Friday",
		shift: "General Shift",
		startTime: "08:00",
		endTime: "17:00"
	},
	{
		id: 6,
		dayOfWeek: "Saturday",
		shift: "General Shift",
		startTime: "08:00",
		endTime: "17:00"
	}
];

const columns = [
	{ key: "dayOfWeek", title: "Day of Week", size: "w-[10%]" },
	{ key: "shift", title: "Shift", size: "w-[10%]" },
	{ key: "time", title: "Time", size: "w-[15%]" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function StaffSchedule({ staff }) {
	console.log(staff);
	const [currentPage, setCurrentPage] = useState(1);
	const patientsPerPage = 10;
	const indexOfLastSchedule = currentPage * patientsPerPage;
	const indexOfFirstSchedule = indexOfLastSchedule - patientsPerPage;
	const currentSchedule = mockData.slice(
		indexOfFirstSchedule,
		indexOfLastSchedule
	);
	const totalPages = Math.ceil(mockData.length / patientsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const displayShift = (shift) => {
		const defaultStyle = "badge border-none text-white font-semibold";
		if (shift === "General Shift") {
			return <p className={`${defaultStyle}  bg-green-400`}>{shift}</p>;
		} else {
			return <p className={`${defaultStyle}  bg-blue-400`}>{shift}</p>;
		}
	};

	const role = localStorage.getItem("role");

	return (
		<div className="w-9/12 mb-6">
			<StaffScheduleModal staff={staff} />
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					{staff.firstName} {staff.lastName}&rsquo;s Schedule
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
						{currentSchedule.map((data, index) => (
							<tr key={index}>
								<td className="align-top text-black font-semibold">
									{data.dayOfWeek}
								</td>
								<td className="align-top text-black flex justify-center">
									{displayShift(data.shift)}
								</td>
								<td className="align-top text-black ">
									<p className="flex justify-center">
										{data.startTime} - {data.endTime}
									</p>
								</td>
								<td className="align-top text-black">
									<StaffScheduleDetail schedule={data} />
									<div
										onClick={() => {
											document
												.getElementById(
													`staff_schedule_${data.id}`
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
