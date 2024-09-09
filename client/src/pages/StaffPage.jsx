import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StaffTable from "../components/staff/main/StaffTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetData } from "../api/apiHooks";
import { useState } from "react";

export default function StaffPage() {
	const { data: departments } = useGetData("/department", ["department"]);
	const navigate = useNavigate();
	const [order, setOrder] = useState("");
	const [department, setDepartment] = useState("");
	const role = localStorage.getItem("role");

	const handleOrderChange = (e) => {
		const value = e.target.value;
		setOrder(value !== "None" ? value : "");
		updateURL(value !== "None" ? value : "", department);
	};

	const handleDepartmentChange = (e) => {
		const value = e.target.value;
		setDepartment(value !== "All" ? value : "");
		updateURL(order, value !== "All" ? value : "");
	};

	const updateURL = (order, department) => {
		let query = [];
		if (order) query.push(`order=${order}`);
		if (department) query.push(`department=${department}`);
		navigate(`/staff?${query.join("&")}`);
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">
				Staff Management
			</h1>
			{/* Filter section */}
			<div className="flex justify-between">
				<div className="flex gap-4">
					<select
						name="name"
						className="select select-bordered bg-white"
						defaultValue={"Sort By Name"}
						onChange={handleOrderChange}
					>
						<option disabled>Sort By Name</option>
						<option>None</option>
						<option>ASC</option>
						<option>DESC</option>
					</select>

					<select
						name="department"
						className="select select-bordered bg-white"
						defaultValue={"Sort By Department"}
						onChange={handleDepartmentChange}
					>
						<option disabled>Sort By Department</option>
						<option>All</option>
						{departments &&
							departments.map((department) => (
								<option
									value={department.department_id}
									key={department.department_id}
								>
									{department.department_name}
								</option>
							))}
					</select>
				</div>
				{role === "Admin" && (
					<div className="flex justify-center items-center">
						<Link
							to={"add-staff"}
							className="py-2 px-3 h-fit w-36 text-center bg-blue-400 rounded text-white transition ease-in-out hover:bg-blue-300"
						>
							<span>
								<FontAwesomeIcon icon={faPlus} />
							</span>{" "}
							Add Staff
						</Link>
					</div>
				)}
			</div>
			<StaffTable />
		</div>
	);
}
