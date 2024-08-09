import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import TreatmentModal from "./TreatmentModal";

const dummyData = [
	{
		date: "2024-08-01",
		doctor: "Dr. John Smith",
		time: "10:00 AM",
		patient: "John Doe",
		description: "General checkup and routine blood tests."
	},
	{
		date: "2024-08-02",
		doctor: "Dr. Emily Johnson",
		time: "11:15 AM",
		patient: "John Doe",
		description: "Consultation regarding chronic back pain."
	},
	{
		date: "2024-08-03",
		doctor: "Dr. Michael Brown",
		time: "09:30 AM",
		patient: "John Doe",
		description: "Follow-up appointment for allergy treatment."
	},
	{
		date: "2024-08-04",
		doctor: "Dr. Sarah Davis",
		time: "02:00 PM",
		patient: "John Doe",
		description: "Skin examination and treatment plan discussion."
	},
	{
		date: "2024-08-05",
		doctor: "Dr. David Wilson",
		time: "01:45 PM",
		patient: "John Doe",
		description:
			"Review of recent test results and medication adjustment. Review of recent test results and medication adjustment."
	}
];

const columns = [
	{ key: "date", title: "Date", size: "w-[15%]" },
	{ key: "doctor", title: "Doctor", size: "w-[21%]" },
	{ key: "time", title: "Time", size: "w-[13%]" },
	{ key: "patient", title: "Patient", size: "w-2/12" },
	{ key: "description", title: "Description", size: "w-3/12" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function TreatmentHistory({ patient }) {
	console.log(patient);

	return (
		<>
			<TreatmentModal patient={patient} />
			<div className="w-9/12 mt-16 mb-6">
				<div className="mb-2 flex justify-between">
					<h1 className="font-semibold text-3xl text-blue-600">
						Treatment History
					</h1>

					<div
						onClick={() =>
							document.getElementById("my_modal_1").showModal()
						}
						className="btn btn-primary text-white"
					>
						Add Treatment
					</div>
				</div>

				<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								{columns.map((column) => (
									<th
										key={column.key}
										className={`${column.size} text-blue-500 text-base`}
									>
										{column.title}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{dummyData.map((data, index) => (
								<tr key={index}>
									<td className="align-top text-black">
										{data.date}
									</td>
									<td className="align-top text-black">
										{data.doctor}
									</td>
									<td className="align-top text-black">
										{data.time}
									</td>
									<td className="align-top text-black">
										{data.patient}
									</td>
									<td className="align-top text-black overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
										{data.description}
									</td>
									<td className="align-top text-black">
										<div className="btn btn-outline rounded-full btn-success hover:text-white">
											<FontAwesomeIcon icon={faEye} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

TreatmentHistory.propTypes = { patient: PropTypes.object.isRequired };
