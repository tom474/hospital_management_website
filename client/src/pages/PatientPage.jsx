import PatientTable from "../components/patient/PatientTable";
import { useNavigate } from "react-router-dom";

export default function PatientPage() {
	const navigate = useNavigate();

	const handleAddPatientClick = () => {
		navigate("/patient/addPatient");
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">Patient Management</h1>
			<div className="flex flex-row mt-10 gap-2">
				<select className="w-1/12 h-10 p-2 bg-white">
					<option value="id">ID</option>
					<option value="name">Name</option>
				</select>
				<input type="text" placeholder="Search Patient ..." className="w-8/12 h-10 pl-5 bg-white" />
				<button className="w-1/12 h-10 bg-blue-400 text-white">Search</button>
				<button className="w-2/12 h-10 bg-blue-400 text-white" onClick={handleAddPatientClick}>
					+ Add Patient
				</button>
			</div>
			<PatientTable />
		</div>
	);
}
