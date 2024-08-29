import { useGetData } from "../../api/apiHooks";
import Select from "react-select";
import { useState } from "react";
import Loading from "../utils/Loading";
import { usePaginate } from "../../utils/common";
import EmptyData from "../utils/EmptyData";
import JobHistoryItem from "./JobHistoryItem";

const columns = [
	{ key: "Staff", title: "Staff", size: "w-[10%]" },
	{ key: "change_date", title: "Change Date", size: "w-[10%]" },
	{ key: "previous_job", title: "Previous Job", size: "w-1/12" },
	{ key: "new_job", title: "New Job", size: "w-1/12" },
	{ key: "previous_salary", title: "Previous Salary", size: "w-1/12" },
	{ key: "new_salary", title: "New Salary", size: "w-1/12" },
	{ key: "previous_dept_id", title: "Previous Department", size: "w-1/12" },
	{ key: "new_dept_id", title: "New Department", size: "w-1/12" }
];

export default function JobHistory() {
	const [staff, setStaff] = useState(null);
	const { data: staffs, isPending: isPendingStaffs } = useGetData("/staff", [
		"staff"
	]);

	let query = {
		url: `/job-history`,
		key: ["job-history"]
	};

	if (staff && staff.value.id !== 0) {
		query.url = `/job-history/staff/${staff.value.id}`;
		query.key = [
			"job-history",
			"get_all_job_history_by_staff_id",
			staff.value.id
		];
	}

	const { data: jobHistory, isPending } = useGetData(query.url, query.key);

	const { currentData, currentPage, paginate, totalPages } =
		usePaginate(jobHistory);

	let options = [];
	if (staffs) {
		options = staffs.map((staff) => ({
			value: {
				id: staff.staff_id,
				name: staff.first_name + " " + staff.last_name
			},
			label: staff.first_name + " " + staff.last_name
		}));
		options.unshift({
			value: {
				id: 0,
				name: "All Staffs"
			},
			label: "All Staffs"
		});
	}

	if (isPending && isPendingStaffs) return <Loading />;

	return (
		<>
			<div className="mt-3">
				<label htmlFor="doctor" className="text-black text-sm">
					View job change of a staff:
				</label>
				<div>
					<Select
						value={staff}
						name="staff"
						onChange={
							(selectedOption) => setStaff(selectedOption) // Updated to set the selected option directly
						}
						options={options}
						placeholder="Select a staff..."
						isSearchable
						className="text-black font-medium border-sky-200 w-full"
					/>
				</div>
			</div>
			<div className="w-full mt-3">
				<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								{columns.map((column) => (
									<th
										key={column.key}
										className={`${column.size} text-blue-500 text-base`}
									>
										{column.title}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{currentData.map((jobHistory) => {
								return (
									<JobHistoryItem
										key={jobHistory.job_history_id}
										jobHistory={jobHistory}
									/>
								);
							})}
						</tbody>
					</table>
					{currentData.length === 0 && (
						<EmptyData>No history found.</EmptyData>
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
		</>
	);
}
