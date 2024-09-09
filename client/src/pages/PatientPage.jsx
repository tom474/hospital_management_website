import { useNavigate } from "react-router-dom";
import PatientTable from "../components/patient/main/PatientTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PatientPage() {
	const role = localStorage.getItem("role");

	const [mode, setMode] = useState("name");
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleAddPatientClick = () => {
		navigate("/patient/add-patient");
	};

	const onSearch = (e) => {
		e.preventDefault();

		if (search === "") {
			navigate("/patient");
		}

		if (mode === "name") {
			navigate(`/patient?name=${search}`);
		} else if (mode === "id") {
			navigate(`/patient?id=${search}`);
		}
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">
				Patient Management
			</h1>
			<form onSubmit={onSearch} className="flex flex-row mt-10 gap-2">
				<select
					value={mode}
					onChange={(e) => setMode(e.target.value)}
					className="w-1/12 h-10 p-2 bg-white border-none"
				>
					<option value="id">ID</option>
					<option value="name">Name</option>
				</select>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search Patient ..."
					className="w-full h-10 pl-5 bg-white focus:outline-none"
				/>
				<button className="w-12 h-10 rounded bg-blue-400 text-white transition ease-in-out hover:bg-blue-300">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
				{(role === "Admin" || role === "Receptionist") && (
					<button
						className="w-2/12 h-10 bg-blue-400 rounded text-white transition ease-in-out hover:bg-blue-300"
						onClick={handleAddPatientClick}
					>
						<span>
							<FontAwesomeIcon icon={faPlus} />
						</span>{" "}
						Add Patient
					</button>
				)}
			</form>
			<PatientTable />
		</div>
	);
}
