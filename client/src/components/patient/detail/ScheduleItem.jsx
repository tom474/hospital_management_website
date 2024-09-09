import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScheduleDetail from "./ScheduleDetail";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { displayStatus, formatDate, formatTime } from "../../../utils/common";
import { useGetData } from "../../../api/apiHooks";

export default function ScheduleItem({ appointment, patientName }) {
	const { data: staff } = useGetData(`/staff/id/${appointment.staff_id}`, [
		"staff",
		"get_by_id",
		appointment.staff_id
	]);

	if (staff) {
		return (
			<tr>
				<td className="align-top text-black">
					{formatDate(appointment.date)}
				</td>
				<td className="align-top text-black">
					{staff[0].first_name + " " + staff[0].last_name}
				</td>
				<td className="align-top text-black">{patientName}</td>
				<td className="align-top text-black">
					{formatTime(appointment.start_time)} -{" "}
					{formatTime(appointment.end_time)}
				</td>
				<td className="align-top text-black flex justify-center">
					{displayStatus(appointment.status)}
				</td>
				<td className="align-top text-black">{appointment.purpose}</td>
				<td className="align-top text-black">
					<ScheduleDetail
						schedule={appointment}
						doctorName={
							staff[0].first_name + " " + staff[0].last_name
						}
						patientName={patientName}
					/>
					<div
						onClick={() => {
							document
								.getElementById(
									`schedule_${appointment.appointment_id}`
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
}

ScheduleItem.propTypes = {
	appointment: PropTypes.object.isRequired,
	patientName: PropTypes.string.isRequired
};
