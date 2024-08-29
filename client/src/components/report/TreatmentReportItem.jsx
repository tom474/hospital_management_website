import PropTypes from "prop-types";
import { formatDate } from "../../utils/common";
import { useGetData } from "../../api/apiHooks";

export default function TreatmentReportItem({ treatment }) {
	const { data: staff } = useGetData(`/staff/id/${treatment.staff_id}`, [
		"staff",
		"get_by_staff_id",
		treatment.staff_id
	]);

	const { data: patient } = useGetData(
		`/patient/id/${treatment.patient_id}`,
		["patient", "get_by_patient_id", treatment.patient_id]
	);

	return (
		<tr>
			<td className="align-top text-black">
				{formatDate(treatment.date)}
			</td>
			<td className="align-top text-black">
				{staff && staff[0].first_name + " " + staff[0].last_name}
			</td>

			<td className="align-top text-black">
				{patient && patient[0].first_name + " " + patient[0].last_name}
			</td>
			<td className="align-top text-black overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
				{treatment.description}
			</td>
		</tr>
	);
}

TreatmentReportItem.propTypes = {
	treatment: PropTypes.object.isRequired
};
