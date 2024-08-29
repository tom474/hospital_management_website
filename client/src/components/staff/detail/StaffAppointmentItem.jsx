import PropTypes from "prop-types";
import ScheduleDetail from "../../patient/detail/ScheduleDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { displayStatus, formatDate, formatTime } from "../../../utils/common";
import { useGetData } from "../../../api/apiHooks";

export default function StaffAppointmentItem({ appointment, staff }) {
	const { data: patient } = useGetData(
		`/patient/id/${appointment.patient_id}`,
		["patient", "get_by_id", appointment.patient_id]
	);

	return (
		<tr>
			<td className="align-top text-black">
				{formatDate(appointment.date)}
			</td>
			<td className="align-top text-black">
				{staff.first_name + " " + staff.last_name}
			</td>
			<td className="align-top text-black">
				{patient && patient[0].first_name + " " + patient[0].last_name}
			</td>
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
					doctorName={staff.first_name + " " + staff.last_name}
					patientName={
						patient &&
						patient[0].first_name + " " + patient[0].last_name
					}
					isStaff={true}
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

StaffAppointmentItem.propTypes = {
	appointment: PropTypes.object.isRequired,
	staff: PropTypes.object.isRequired
};
