import PropTypes from "prop-types";
import { displayJobType, formatSalary } from "../../../utils/common";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useGetData } from "../../../api/apiHooks";

export default function StaffItem({ staff }) {
	const { data: department } = useGetData(
		`/department/id/${staff.department_id}`,
		["department", "get_by_id", staff.department_id]
	);

	let manager_name = "None";

	const { data: manager, isPending } = useGetData(
		`/staff/id/${staff.manager_id}`,
		["staff", "get_by_id", staff.manager_id]
	);

	if (!isPending && manager) {
		manager_name = `${manager[0].first_name} ${manager[0].last_name}`;
	}

	return (
		<tr>
			<td className="align-top font-bold text-blue-600">
				{staff.staff_id}
			</td>
			<td className="align-top text-black ">
				{staff.first_name} {staff.last_name}
			</td>
			<td className="align-top text-black">{staff.email}</td>
			{displayJobType(staff.job_type)}
			<td className="align-top text-black">
				{department && department[0].department_name}
			</td>
			<td className="align-top text-black">{manager_name}</td>
			<td className="align-top text-black">
				{formatSalary(staff.salary)}
			</td>

			<td className="align-top text-black">
				<Link
					to={`${staff.staff_id}`}
					className="btn btn-outline rounded-full btn-success hover:text-white"
				>
					<FontAwesomeIcon icon={faEye} />
				</Link>
			</td>
		</tr>
	);
}

StaffItem.propTypes = {
	staff: PropTypes.object.isRequired
};
