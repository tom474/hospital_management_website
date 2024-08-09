import { useLocation } from "react-router-dom";
import Sidebar from "../components/patient/detail/Sidebar";

const patient = {
	id: 1,
	firstName: "John",
	lastName: "Doe",
	email: "JohnDoe@gmail.com",
	phoneNumber: "0901213241",
	birthDate: "01/01/2000",
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
			<div></div>
		</div>
	);
}
