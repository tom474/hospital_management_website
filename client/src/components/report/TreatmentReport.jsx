import PropTypes from "prop-types";
import { useGetData } from "../../api/apiHooks";
import { usePaginate } from "../../utils/common";
import Loading from "../utils/Loading";
import EmptyData from "../utils/EmptyData";
import TreatmentReportItem from "./TreatmentReportItem";
import Select from "react-select";
import { useState } from "react";

const columns = [
	{ key: "date", title: "Date", size: "w-[13%]" },
	{ key: "doctor", title: "Doctor", size: "w-[18%]" },
	{ key: "patient", title: "Patient", size: "w-[15%]" },
	{ key: "description", title: "Description", size: "w-4/12" }
];

export default function TreatmentReport({ duration }) {
	const [patient, setPatient] = useState(null);
	const { data: patients, isPending: isPendingPatients } = useGetData(
		"/patient",
		["patient"]
	);
	let query = {
		url: `/treatment?start_date=${duration.startDate}&end_date=${duration.endDate}`,
		key: [
			"treatment",
			"get_all_treatment_in_range",
			duration.startDate,
			duration.startDate
		]
	};
	if (patient && patient.value.id !== 0) {
		query.url = `/treatment/${patient.value.id}?start_date=${duration.startDate}&end_date=${duration.endDate}`;
		query.key = [
			"treatment",
			"get_all_treatment_by_patient_id",
			patient.value.id,
			duration.startDate,
			duration.startDate
		];
	}
	const { data: treatments, isPending } = useGetData(query.url, query.key);

	const {
		currentData: currentTreatments,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(treatments);

	let options = [];
	if (patients) {
		options = patients.map((patient) => ({
			value: {
				id: patient.patient_id,
				name: patient.first_name + " " + patient.last_name
			},
			label: patient.first_name + " " + patient.last_name
		}));
		options.unshift({
			value: {
				id: 0,
				name: "All Patients"
			},
			label: "All Patients"
		});
	}

	if (isPending && isPendingPatients) return <Loading />;

	return (
		<>
			<div className="mt-3">
				<label htmlFor="doctor" className="text-black text-sm">
					View treatment of a patient:
				</label>
				<div>
					<Select
						value={patient} // Changed from `value={patient.name}` to `value={patient}`
						name="patient"
						onChange={
							(selectedOption) => setPatient(selectedOption) // Updated to set the selected option directly
						}
						options={options}
						placeholder="Select a patient..."
						isSearchable
						className="text-black font-medium border-sky-200 w-full"
					/>
				</div>
			</div>
			<div className="w-full mt-3">
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
							{currentTreatments.map((treatment, index) => {
								return (
									<TreatmentReportItem
										key={index}
										treatment={treatment}
									/>
								);
							})}
						</tbody>
					</table>
					{currentTreatments.length === 0 && (
						<EmptyData>No treatment found.</EmptyData>
					)}
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

TreatmentReport.propTypes = {
	duration: PropTypes.object.isRequired
};
