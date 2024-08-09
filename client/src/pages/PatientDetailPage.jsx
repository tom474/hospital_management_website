import { useLocation } from "react-router-dom";
import Sidebar from "../components/patient/detail/Sidebar";
import PatientInformation from "../components/patient/detail/PatientInformation";
import Schedule from "../components/patient/detail/Schedule";

const patient = {
	id: 1,
	firstName: "John",
	lastName: "Doe",
	email: "JohnDoe@gmail.com",
	phoneNumber: "0901213241",
	birthDate: "2000-01-01",
	bloodType: "A+",
	address: "123 Main St, Springfield, IL",
	allergies: "Peanuts, Shellfish, Pollen"
};

export default function PatientDetailPage() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	// Get the value of the query parameter "option" to determine which content to display
	const option = queryParams.get("option");

	return (
		<div className="flex flex-row gap-2">
			<Sidebar patient={patient} />

			{option == "personal_information" && (
				<PatientInformation patient={patient} />
			)}
			{option == null && <PatientInformation patient={patient} />}
			{option == "schedule" && <Schedule patient={patient} />}
		</div>
	);
}
