import PropTypes from "prop-types";
import { formatDate } from "../../../utils/common";
import TreatmentDetail from "./TreatmentDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useGetData } from "../../../api/apiHooks";

export default function TreatmentItem({ treatment, patientName }) {
	const { data: staff } = useGetData(`/staff/id/${treatment.staff_id}`, [
		"staff",
		"get_by_id",
		treatment.staff_id
	]);

	let staffName = "";

	if (staff) {
		staffName = staff[0].first_name + " " + staff[0].last_name;
	}

	return (
		<tr>
			<td className="align-top text-black">
				{formatDate(treatment.date)}
			</td>
			<td className="align-top text-black">{staffName}</td>

			<td className="align-top text-black">{patientName}</td>
			<td className="align-top text-black overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
				{treatment.description}
			</td>
			<td className="align-top text-black">
				<TreatmentDetail
					treatment={treatment}
					patientName={patientName}
					staffName={staffName}
				/>
				<div
					onClick={() => {
						document
							.getElementById(
								"treatment_" + treatment.treatment_id
							)
							.showModal();
					}}
					className="btn btn-outline rounded-full btn-success hover:text-white"
				>
					<FontAwesomeIcon icon={faEye} />
				</div>
			</td>
		</tr>
	);
}

TreatmentItem.propTypes = {
	treatment: PropTypes.object.isRequired,
	patientName: PropTypes.string.isRequired
};
