import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import TreatmentModal from "./TreatmentModal";
import TreatmentDetail from "./TreatmentDetail";
import { useState } from "react";
import DurationModal from "../../appointment/main/DurationModal";

const dummyData = [
	{
		id: 1,
		date: "2024-08-01",
		doctor: "Dr. John Smith",
		patient: "John Doe",
		description: "General checkup and routine blood tests."
	},
	{
		id: 2,
		date: "2024-08-02",
		doctor: "Dr. Emily Johnson",
		patient: "John Doe",
		description: "Consultation regarding chronic back pain."
	},
	{
		id: 3,
		date: "2024-08-03",
		doctor: "Dr. Michael Brown",
		patient: "John Doe",
		description: "Follow-up appointment for allergy treatment."
	},
	{
		id: 4,
		date: "2024-08-04",
		doctor: "Dr. Sarah Davis",
		patient: "John Doe",
		description: "Skin examination and treatment plan discussion."
	},
	{
		id: 5,
		date: "2024-08-05",
		doctor: "Dr. David Wilson",
		patient: "John Doe",
		description:
			"Review of recent test results and medication adjustment. Review of recent test results and medication adjustment."
	}
];

const columns = [
	{ key: "date", title: "Date", size: "w-[13%]" },
	{ key: "doctor", title: "Doctor", size: "w-[18%]" },
	{ key: "patient", title: "Patient", size: "w-[15%]" },
	{ key: "description", title: "Description", size: "w-4/12" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function TreatmentHistory({ patient }) {
	const [duration, setDuration] = useState({
		date: "",
		startTime: "",
		endTime: ""
	});

	const role = localStorage.getItem("role");

	const [currentPage, setCurrentPage] = useState(1);
	const patientsPerPage = 10;
	const indexOfLastTreatment = currentPage * patientsPerPage;
	const indexOfFirstTreatment = indexOfLastTreatment - patientsPerPage;
	const currentTreatment = dummyData.slice(
		indexOfFirstTreatment,
		indexOfLastTreatment
	);
	const totalPages = Math.ceil(dummyData.length / patientsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	console.log(patient);

	const time =
		duration.date +
		"- (" +
		duration.startTime +
		" - " +
		duration.endTime +
		")";

	const handleDuration = (newDuration) => {
		setDuration(newDuration);
		document.getElementById("duration_modal").close();
	};

	return (
		<>
			<TreatmentModal patient={patient} />
			<div className="w-9/12 mb-6">
				<div className="mb-2 flex justify-between">
					<DurationModal
						key={"treatment_history"}
						duration={duration}
						onUpdate={handleDuration}
					/>

					<h1 className="font-semibold text-3xl text-blue-600">
						Treatment History
					</h1>
					<div className="flex gap-2 items-center">
						<div
							onClick={() => {
								document
									.getElementById("duration_modal")
									.showModal();
							}}
							className="p-2 bg-blue-400 w-fit text-center text-white font-semibold rounded transition ease-in-out hover:bg-blue-300 cursor-pointer"
						>
							<p>{duration.date === "" ? "Filter" : time}</p>
						</div>
						{(role === "Doctor" || role === "Receptionist") && (
							<div
								onClick={() =>
									document
										.getElementById("my_modal_1")
										.showModal()
								}
								className="btn btn-primary text-white"
							>
								Add Treatment
							</div>
						)}
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
							{currentTreatment.map((data, index) => {
								console.log(data);
								return (
									<tr key={index}>
										<td className="align-top text-black">
											{data.date}
										</td>
										<td className="align-top text-black">
											{data.doctor}
										</td>

										<td className="align-top text-black">
											{data.patient}
										</td>
										<td className="align-top text-black overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
											{data.description}
										</td>
										<td className="align-top text-black">
											<TreatmentDetail treatment={data} />
											<div
												onClick={() => {
													document
														.getElementById(
															"treatment_" +
																data.id
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
							})}
						</tbody>
					</table>
				</div>
				<div className="flex justify-end mb-5 mt-2">
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
			</div>
		</>
	);
}

TreatmentHistory.propTypes = { patient: PropTypes.object.isRequired };
