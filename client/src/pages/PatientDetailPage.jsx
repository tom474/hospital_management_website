import { Link, useLocation } from "react-router-dom";
import Sidebar from "../components/patient/detail/Sidebar";
import PatientInformation from "../components/patient/detail/PatientInformation";
import Schedule from "../components/patient/detail/Schedule";
import TreatmentHistory from "../components/patient/detail/TreatmentHistory";

const patient = {
	id: 1,
	firstName: "John",
	lastName: "Doe",
	email: "JohnDoe@gmail.com",
	phoneNumber: "0901213241",
	birthDate: "2000-01-01",
	address: "123 Main St, Springfield, IL",
	allergies: "Peanuts, Shellfish, Pollen"
};

export default function PatientDetailPage() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	// Get the value of the query parameter "option" to determine which content to display
	const option = queryParams.get("option");

	return (
		<div className="mt-4">
			<div className="mb-3 ">
				<Link
					className="text-2xl  font-bold cursor-pointer transition ease-in-out hover:text-blue-600"
					to={"/patient"}
				>
					Back
				</Link>
			</div>

			<div className="flex flex-row gap-4">
				<Sidebar patient={patient} />

				{option == "personal_information" && (
					<PatientInformation patient={patient} />
				)}
				{option == null && <PatientInformation patient={patient} />}
				{option == "appointment" && <Schedule patient={patient} />}
				{option == "treatment" && (
					<TreatmentHistory patient={patient} />
				)}
			</div>
		</div>
	);
}
