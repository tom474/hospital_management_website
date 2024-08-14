import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StaffTable from "../components/staff/main/StaffTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function StaffPage() {
	const handleOnChange = (e) => {
		console.log(e.target.value);
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
						onChange={handleOnChange}
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
						onChange={handleOnChange}
					>
						<option disabled>Sort By Department</option>
						<option>All</option>
						<option>Department 1</option>
						<option>Department 2</option>
						<option>Department 3</option>
						<option>Department 4</option>
						<option>Department 5</option>
						<option>Department 6</option>
					</select>
				</div>

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
			</div>
			<StaffTable />
		</div>
	);
}
