import PropTypes from "prop-types";
import { useState } from "react";
import { formatSalary } from "../../../utils/common";

const dummyData = [
	{
		staff: "John Doe",
		change_date: "2024-08-15",
		previous_job: "Doctor",
		new_job: "Nurse",
		previous_salary: "80000",
		new_salary: "95000",
		previous_dept: "Department 1",
		new_dept: "Department 2"
	},
	{
		staff: "Jane Smith",
		change_date: "2024-07-22",
		previous_job: "Nurse",
		new_job: "Receptionist",
		previous_salary: "70000",
		new_salary: "85000",
		previous_dept: "Department 3",
		new_dept: "Department 4"
	},
	{
		staff: "Michael Johnson",
		change_date: "2024-06-10",
		previous_job: "Receptionist",
		new_job: "Doctor",
		previous_salary: "65000",
		new_salary: "80000",
		previous_dept: "Department 5",
		new_dept: "Department 6"
	}
];

const columns = [
	{ key: "staff", title: "Staff", size: "" },
	{ key: "change_date", title: "Change Date", size: "" },
	{ key: "previous_job", title: "Previous Job", size: "" },
	{ key: "new_job", title: "New Job", size: "" },
	{ key: "previous_salary", title: "Previous Salary", size: "" },
	{ key: "new_salary", title: "New Salary", size: "" },
	{ key: "previous_dept", title: "Previous Department", size: "" },
	{ key: "new_dept", title: "New Department ", size: "" }
];

export default function JobHistory({ staff }) {
	const [currentPage, setCurrentPage] = useState(1);
	const patientsPerPage = 10;
	const indexOfLastSchedule = currentPage * patientsPerPage;
	const indexOfFirstSchedule = indexOfLastSchedule - patientsPerPage;
	const currentSchedule = dummyData.slice(
		indexOfFirstSchedule,
		indexOfLastSchedule
	);
	const totalPages = Math.ceil(dummyData.length / patientsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	console.log(staff);

	return (
		<div className="w-9/12 mb-6">
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					Job History
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
						{currentSchedule.map((data, index) => (
							<tr key={index}>
								<td className="align-top text-black">
									{data.staff}
								</td>
								<td className="align-top text-black">
									{data.change_date}
								</td>
								<td className="align-top text-black">
									{data.previous_job}
								</td>
								<td className="align-top text-black">
									{data.new_job}
								</td>
								<td className="align-top text-black">
									{formatSalary(data.previous_salary)}
								</td>
								<td className="align-top text-black">
									{formatSalary(data.new_salary)}
								</td>
								<td className="align-top text-black">
									{data.previous_dept}
								</td>
								<td className="align-top text-black">
									{data.new_dept}
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

JobHistory.propTypes = { staff: PropTypes.object.isRequired };
