import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const dummyData = [
	{
		date: "2024-08-01",
		doctor: "Dr. John Smith",
		time: "10:00 AM",
		purpose: "General Checkup"
	},
	{
		date: "2024-08-05",
		doctor: "Dr. Emily Johnson",
		time: "02:00 PM",
		purpose: "Follow-up on Blood Test Results"
	},
	{
		date: "2024-08-10",
		doctor: "Dr. Michael Brown",
		time: "09:00 AM",
		purpose:
			"Consultation for Allergy Symptoms Consultation for Allergy SymptomsConsultation for Allergy SymptomsConsultation for Allergy Symptoms"
	},
	{
		date: "2024-08-12",
		doctor: "Dr. Sarah Davis",
		time: "11:30 AM",
		purpose: "Dermatology Consultation"
	},
	{
		date: "2024-08-15",
		doctor: "Dr. David Wilson",
		time: "01:00 PM",
		purpose: "Review of Medication Plan"
	}
];

const columns = [
	{ key: "date", title: "Date", size: "w-[10%]" },
	{ key: "doctor", title: "Doctor", size: "w-2/12" },
	{ key: "time", title: "Time", size: "w-[12%]" },
	{ key: "purpose", title: "Purpose", size: "w-4/12" },
	{ key: "action", title: "Action", size: "w-1/12" }
];

export default function Schedule({ patient }) {
	console.log(patient);

	return (
		<div className="w-9/12 mt-16 mb-6">
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					Patient Schedule
				</h1>
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
									{data.purpose}
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
	);
}

Schedule.propTypes = { patient: PropTypes.object.isRequired };
