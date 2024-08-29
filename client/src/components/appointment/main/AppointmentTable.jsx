import PropTypes from "prop-types";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppointmentModal from "./AppointmentModal";
import {
	adjustDateByOneDay,
	formatDate,
	formatTime,
	useExtractSearchParams,
	usePaginate
} from "../../../utils/common";
import { useGetData } from "../../../api/apiHooks";
import Loading from "../../utils/Loading";
import EmptyData from "../../utils/EmptyData";

export default function AppointmentTable({ duration }) {
	const mode = useExtractSearchParams("mode");
	let columns = [];
	if (mode === "busy") {
		columns = [
			{ key: "ID", title: "ID", size: "w-[2%]" },
			{ key: "Name", title: "Name", size: "w-[8%]" },
			{ key: "Email", title: "Email", size: "w-[5%]" },
			{ key: "JobType", title: "Job Type", size: "w-1/12" },
			{ key: "Date", title: "Date", size: "w-1/12" },
			{ key: "Department", title: "Department", size: "w-[5%]" },
			{ key: "Time", title: "Time", size: "w-1/12" }
		];
	} else {
		columns = [
			{ key: "ID", title: "ID", size: "w-[2%]" },
			{ key: "Name", title: "Name", size: "w-[8%]" },
			{ key: "Email", title: "Email", size: "w-[5%]" },
			{ key: "JobType", title: "Job Type", size: "w-1/12" },
			{ key: "Date", title: "Date", size: "w-1/12" },
			{ key: "Department", title: "Department", size: "w-[5%]" },
			{ key: "Time", title: "Time", size: "w-1/12" },
			{ key: "Action", title: "Action", size: "w-[0%]" }
		];
	}

	let query = {
		url: `/staff/available?start_date=${adjustDateByOneDay(
			duration.startDate
		)}&end_date=${adjustDateByOneDay(duration.endDate)}`,
		key: ["available_staffs", duration]
	};
	if (mode === "busy") {
		query.url = `/staff/busy?start_date=${adjustDateByOneDay(
			duration.startDate
		)}&end_date=${adjustDateByOneDay(duration.endDate)}`;
		query.key = ["busy_staffs", duration];
	}

	const { data, isPending } = useGetData(query.url, query.key);

	const { currentData, currentPage, paginate, totalPages } =
		usePaginate(data);

	const displayJobType = (jobType) => {
		let defaultStyle =
			"py-2 text-xs rounded-full text-center w-fit min-w-24 font-bold";

		if (jobType === "Doctor") {
			defaultStyle += " bg-blue-400 text-white";
		}

		if (jobType === "Nurse") {
			defaultStyle += " bg-green-400 text-white";
		}

		if (jobType === "Receptionist") {
			defaultStyle += " bg-yellow-400 text-white";
		}

		if (jobType === "Administrative") {
			defaultStyle += " bg-red-400 text-white";
		}

		return (
			<td className="align-top text-black flex justify-center">
				<p className={`${defaultStyle} `}>{jobType}</p>
			</td>
		);
	};

	if (isPending) return <Loading />;

	return (
		<>
			<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
				<table className="table">
					<thead>
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`${
										column.size
									} text-blue-500 text-base ${
										(column.key == "JobType" ||
											column.key == "Time") &&
										"text-center"
									}`}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{currentData.map((staff, index) => (
							<tr key={index}>
								<td className="align-top font-bold text-blue-600">
									{staff.staff_id}
								</td>
								<td className="align-top text-black ">
									{staff.first_name} {staff.last_name}
								</td>
								<td className="align-top text-black ">
									{staff.email}
								</td>
								{displayJobType(staff.job_type)}
								<td className="align-top text-black">
									{formatDate(staff.date)}
								</td>
								<td className="align-top text-black">
									{staff.department_name}
								</td>
								<td className="align-top text-black text-center">
									{formatTime(staff.start_time)} -{" "}
									{formatTime(staff.end_time)}
								</td>
								{mode !== "busy" && (
									<td className="align-top text-black">
										<AppointmentModal
											doctor={staff}
											date={formatDate(staff.date)}
											minTime={formatTime(
												staff.start_time
											)}
											maxTime={formatTime(staff.end_time)}
											index={index}
										/>
										<div
											onClick={() => {
												document
													.getElementById(
														`appointment_modal_${staff.staff_id}_${index}`
													)
													.showModal();
											}}
											className="btn btn-outline rounded-full btn-success hover:text-white"
										>
											<FontAwesomeIcon
												icon={faCalendarCheck}
											/>
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
				{currentData.length === 0 && (
					<EmptyData>No staff found.</EmptyData>
				)}
			</div>
			<div className="flex justify-center mb-5">
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => paginate(i + 1)}
						className={`px-3 py-1 mx-1 ${
							currentPage === i + 1
								? "bg-blue-400 text-white"
								: "bg-gray-200"
						} rounded`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</>
	);
}

AppointmentTable.propTypes = {
	duration: PropTypes.object.isRequired
};
