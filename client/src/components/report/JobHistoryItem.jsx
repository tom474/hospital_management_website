import PropTypes from "prop-types";
import {
	adjustDateByOneDay,
	formatDate,
	formatSalary
} from "../../utils/common";
import { useGetData } from "../../api/apiHooks";

export default function JobHistoryItem({ jobHistory }) {
	const { data: staff } = useGetData(`/staff/id/${jobHistory.staff_id}`, [
		"staff",
		"get_by_staff_id",
		jobHistory.staff_id
	]);

	// Only fetch previous department data if previous_dept_id is not null
	const { data: prev_dept } = useGetData(
		jobHistory.previous_dept_id
			? `/department/id/${jobHistory.previous_dept_id}`
			: null,
		["department", "get_by_department_id", jobHistory.previous_dept_id],
		{ enabled: !!jobHistory.previous_dept_id }
	);

	// Only fetch new department data if new_dept_id is not null
	const { data: new_dept } = useGetData(
		jobHistory.new_dept_id
			? `/department/id/${jobHistory.new_dept_id}`
			: null,
		["department", "get_by_department_id", jobHistory.new_dept_id],
		{ enabled: !!jobHistory.new_dept_id }
	);

	return (
		<tr>
			<td className="align-top text-black">
				{staff && staff[0].first_name + " " + staff[0].last_name}
			</td>
			<td className="align-top text-black">
				{adjustDateByOneDay(formatDate(jobHistory.change_date))}
			</td>
			<td className="align-top text-black">{jobHistory.previous_job}</td>
			<td className="align-top text-black">{jobHistory.new_job}</td>
			<td className="align-top text-black">
				{formatSalary(jobHistory.previous_salary)}
			</td>
			<td className="align-top text-black">
				{formatSalary(jobHistory.new_salary)}
			</td>
			<td className="align-top text-black">
				{jobHistory.previous_dept_id && prev_dept
					? prev_dept[0].department_name
					: "N/A"}
			</td>
			<td className="align-top text-black">
				{jobHistory.new_dept_id && new_dept
					? new_dept[0].department_name
					: "N/A"}
			</td>
		</tr>
	);
}

JobHistoryItem.propTypes = {
	jobHistory: PropTypes.object.isRequired
};
