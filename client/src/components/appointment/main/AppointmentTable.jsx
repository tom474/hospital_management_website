import PropTypes from "prop-types";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AppointmentModal from "./AppointmentModal";

const staffs = [
	{
		id: 1,
		jobType: "Doctor",
		firstName: "John",
		lastName: "Doe",
		email: "JohnDoe@gmail.com",
		department: "Department 1",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 2,
		jobType: "Doctor",
		firstName: "Jane",
		lastName: "Smith",
		email: "JaneSmith@gmail.com",
		department: "Department 2",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 3,
		jobType: "Doctor",
		firstName: "Emily",
		lastName: "Jones",
		email: "EmilyJones@gmail.com",
		department: "Department 3",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 4,
		jobType: "Doctor",
		firstName: "Michael",
		lastName: "Brown",
		email: "MichaelBrown@gmail.com",
		department: "Department 4",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 5,
		jobType: "Doctor",
		firstName: "Jessica",
		lastName: "Taylor",
		email: "JessicaTaylor@gmail.com",
		department: "Department 5",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 6,
		jobType: "Doctor",
		firstName: "David",
		lastName: "Wilson",
		email: "DavidWilson@gmail.com",
		department: "Department 6",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 7,
		jobType: "Doctor",
		firstName: "Emma",
		lastName: "Davis",
		email: "EmmaDavis@gmail.com",
		department: "Department 7",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 8,
		jobType: "Doctor",
		firstName: "Christopher",
		lastName: "Martinez",
		email: "ChristopherMartinez@gmail.com",
		department: "Department 8",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 9,
		jobType: "Doctor",
		firstName: "Sophia",
		lastName: "Anderson",
		email: "SophiaAnderson@gmail.com",
		department: "Department 9",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 10,
		jobType: "Doctor",
		firstName: "Matthew",
		lastName: "Lee",
		email: "MatthewLee@gmail.com",
		department: "Department 1",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 11,
		jobType: "Doctor",
		firstName: "Olivia",
		lastName: "Harris",
		email: "OliviaHarris@gmail.com",
		department: "Department 2",
		startTime: "08:00",
		endTime: "22:00"
	},
	{
		id: 12,
		jobType: "Doctor",
		firstName: "Daniel",
		lastName: "Clark",
		email: "DanielClark@gmail.com",
		department: "Department 3",
		startTime: "08:00",
		endTime: "22:00"
	}
];

const columns = [
	{ key: "ID", title: "ID", size: "w-[2%]" },
	{ key: "Name", title: "Name", size: "w-[10%]" },
	{ key: "Email", title: "Email", size: "w-[7%]" },
	{ key: "JobType", title: "Job Type", size: "w-1/12" },
	{ key: "Department", title: "Department", size: "w-[5%]" },
	{ key: "Time", title: "Time", size: "w-1/12" },
	{ key: "Action", title: "Action", size: "w-[0%]" }
];

export default function AppointmentTable({ date }) {
	const [currentPage, setCurrentPage] = useState(1);
	const staffsPerPage = 10;
	const indexOfLastStaff = currentPage * staffsPerPage;
	const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
	const currentStaffs = staffs.slice(indexOfFirstStaff, indexOfLastStaff);
	const totalPages = Math.ceil(staffs.length / staffsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const displayJobType = (jobType) => {
		let defaultStyle =
			"py-2 text-xs rounded-full text-center w-fit min-w-24 font-bold";

		if (jobType === "Doctor") {
			defaultStyle += " bg-blue-400 text-white";
		}

		if (jobType === "Nurse") {
			defaultStyle += " bg-green-400 text-white";
		}

		if (jobType === "Receptionist") {
			defaultStyle += " bg-yellow-400 text-white";
		}

		return (
			<td className="align-top text-black flex justify-center">
				<p className={`${defaultStyle} `}>{jobType}</p>
			</td>
		);
	};

	return (
		<>
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
										(column.key == "JobType" ||
											column.key == "Time") &&
										"text-center"
									}`}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentStaffs.map((staff, index) => (
							<tr key={index}>
								<td className="align-top font-bold text-blue-600">
									{staff.id}
								</td>
								<td className="align-top text-black ">
									{staff.firstName} {staff.lastName}
								</td>
								<td className="align-top text-black ">
									{staff.email}
								</td>
								{displayJobType(staff.jobType)}
								<td className="align-top text-black">
									{staff.department}
								</td>
								<td className="align-top text-black text-center">
									{staff.startTime} - {staff.endTime}
								</td>

								<td className="align-top text-black">
									<AppointmentModal
										doctor={staff}
										date={date}
									/>
									<div
										onClick={() => {
											document
												.getElementById(
													`appointment_modal_${staff.id}`
												)
												.showModal();
										}}
										className="btn btn-outline rounded-full btn-success hover:text-white"
									>
										<FontAwesomeIcon
											icon={faCalendarCheck}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center mb-5">
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
		</>
	);
}

AppointmentTable.propTypes = {
	date: PropTypes.string.isRequired
};
