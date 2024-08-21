import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatSalary } from "../../../utils/common";

const staffs = [
	{
		id: 1,
		jobType: "Doctor",
		firstName: "John",
		lastName: "Doe",
		email: "JohnDoe@gmail.com",
		department: "Cardiology",
		salary: 1000
	},
	{
		id: 2,
		jobType: "Nurse",
		firstName: "Jane",
		lastName: "Smith",
		email: "JaneSmith@gmail.com",
		department: "Pediatrics",
		salary: 8000
	},
	{
		id: 3,
		jobType: "Doctor",
		firstName: "Emily",
		lastName: "Jones",
		email: "EmilyJones@gmail.com",
		department: "Surgery",
		salary: 12000
	},
	{
		id: 4,
		jobType: "Doctor",
		firstName: "Michael",
		lastName: "Brown",
		email: "MichaelBrown@gmail.com",
		department: "Pharmacy",
		salary: 900
	},
	{
		id: 5,
		jobType: "Nurse",
		firstName: "Jessica",
		lastName: "Taylor",
		email: "JessicaTaylor@gmail.com",
		department: "Rehabilitation",
		salary: 9500
	},
	{
		id: 6,
		jobType: "Nurse",
		firstName: "David",
		lastName: "Wilson",
		email: "DavidWilson@gmail.com",
		department: "Radiology",
		salary: 850
	},
	{
		id: 7,
		jobType: "Receptionist",
		firstName: "Emma",
		lastName: "Davis",
		email: "EmmaDavis@gmail.com",
		department: "Administration",
		salary: 500
	},
	{
		id: 8,
		jobType: "Doctor",
		firstName: "Christopher",
		lastName: "Martinez",
		email: "ChristopherMartinez@gmail.com",
		department: "Neurology",
		salary: 1100
	},
	{
		id: 9,
		jobType: "Nurse",
		firstName: "Sophia",
		lastName: "Anderson",
		email: "SophiaAnderson@gmail.com",
		department: "Emergency",
		salary: 8200
	},
	{
		id: 10,
		jobType: "Receptionist",
		firstName: "Matthew",
		lastName: "Lee",
		email: "MatthewLee@gmail.com",
		department: "Orthopedics",
		salary: 1250
	},
	{
		id: 11,
		jobType: "Receptionist",
		firstName: "Olivia",
		lastName: "Harris",
		email: "OliviaHarris@gmail.com",
		department: "Pathology",
		salary: 7800
	},
	{
		id: 12,
		jobType: "Doctor",
		firstName: "Daniel",
		lastName: "Clark",
		email: "DanielClark@gmail.com",
		department: "Oncology",
		salary: 1150
	}
];

const columns = [
	{ key: "ID", title: "ID", size: "w-[2%]" },
	{ key: "Name", title: "Name", size: "w-[13%]" },
	{ key: "Email", title: "Email", size: "w-[8%]" },
	{ key: "JobType", title: "Job Type", size: "w-1/12" },
	{ key: "Department", title: "Department", size: "w-1/12" },
	{ key: "Salary", title: "Salary", size: "w-1/12" },
	{ key: "Action", title: "Action", size: "w-[0%]" }
];

export default function StaffTable() {
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
										column.key == "JobType" && "text-center"
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
								<td className="align-top text-black">
									{staff.email}
								</td>
								{displayJobType(staff.jobType)}
								<td className="align-top text-black">
									{staff.department}
								</td>
								<td className="align-top text-black">
									{formatSalary(staff.salary)}
								</td>

								<td className="align-top text-black">
									<Link
										to={`${staff.id}`}
										className="btn btn-outline rounded-full btn-success hover:text-white"
									>
										<FontAwesomeIcon icon={faEye} />
									</Link>
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
