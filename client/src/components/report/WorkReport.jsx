import { useState } from "react";
import PropTypes from "prop-types";
import { useGetData } from "../../api/apiHooks";
import Loading from "../utils/Loading";
import {
	adjustDateByOneDay,
	formatDate,
	usePaginate
} from "../../utils/common";
import Select from "react-select";
import EmptyData from "../utils/EmptyData";

const columns = [
	{ key: "Staff_Id", title: "Staff Id", size: "w-[1%]" },
	{ key: "Staff", title: "Staff", size: "w-[6%]" },
	{ key: "Patient", title: "Patient", size: "w-[6%]" },
	{ key: "date", title: "Date", size: "w-[6%]" },
	{ key: "work_description", title: "Work Description", size: "w-3/12" }
];

export default function WorkReport({ duration }) {
	const [staff, setStaff] = useState(null);
	const { data: staffs, isPending: isPendingStaffs } = useGetData("/staff", [
		"staff"
	]);

	let query = {
		url: `/staff/works?start_date=${duration.startDate}&end_date=${duration.endDate}`,
		key: ["staff", "works", "range", duration.startDate, duration.endDate]
	};

	if (staff && staff.value.id !== 0) {
		query.url = `/staff/works/${staff.value.id}?start_date=${duration.startDate}&end_date=${duration.endDate}`;
		query.key = [
			"staff",
			"get_by_id",
			"works",
			"range",
			duration.startDate,
			duration.endDate,
			staff.value.id
		];
	}

	const { data: works, isPending } = useGetData(query.url, query.key);

	const {
		currentData: currentWorks,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(works);

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
					View the work of a staff:
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
							{currentWorks.map((work, index) => {
								return (
									<tr key={index}>
										<td className="align-top text-black">
											{work.staff_id}
										</td>
										<td className="align-top text-black">
											{work.staff_first_name +
												" " +
												work.staff_last_name}
										</td>
										<td className="align-top text-black">
											{work.patient_first_name +
												" " +
												work.patient_last_name}
										</td>
										<td className="align-top text-black">
											{adjustDateByOneDay(
												formatDate(work.date)
											)}
										</td>
										<td className="align-top text-black">
											{work.work_description}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{currentWorks.length === 0 && (
						<EmptyData>No work history found.</EmptyData>
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

WorkReport.propTypes = {
	duration: PropTypes.object.isRequired
};
