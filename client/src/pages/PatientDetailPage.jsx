import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/patient/detail/Sidebar";
import PatientInformation from "../components/patient/detail/PatientInformation";
import Schedule from "../components/patient/detail/Schedule";
import TreatmentHistory from "../components/patient/detail/TreatmentHistory";
import { useExtractSearchParams } from "../utils/common";
import { useGetData } from "../api/apiHooks";
import Loading from "../components/utils/Loading";

export default function PatientDetailPage() {
	const option = useExtractSearchParams("option");
	const { patientId } = useParams();
	const { data, isPending } = useGetData(`/patient/id/${patientId}`, [
		"patient",
		"get_by_id",
		patientId
	]);

	if (isPending) return <Loading />;

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
				<Sidebar patient={data[0]} />

				{option == "personal_information" && (
					<PatientInformation patient={data[0]} />
				)}
				{option == null && <PatientInformation patient={data[0]} />}
				{option == "appointment" && <Schedule patient={data[0]} />}
				{option == "treatment" && (
					<TreatmentHistory patient={data[0]} />
				)}
			</div>
		</div>
	);
}
