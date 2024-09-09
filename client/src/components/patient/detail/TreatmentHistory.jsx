import PropTypes from "prop-types";
import TreatmentModal from "./TreatmentModal";
import { useGetData } from "../../../api/apiHooks";
import { usePaginate } from "../../../utils/common";
import Loading from "../../utils/Loading";
import TreatmentItem from "./TreatmentItem";
import EmptyData from "../../utils/EmptyData";

const columns = [
	{ key: "date", title: "Date", size: "w-[13%]" },
	{ key: "doctor", title: "Doctor", size: "w-[18%]" },
	{ key: "patient", title: "Patient", size: "w-[15%]" },
	{ key: "description", title: "Description", size: "w-4/12" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function TreatmentHistory({ patient }) {
	const role = localStorage.getItem("role");
	const patientName = patient.first_name + " " + patient.last_name;

	const { data: treatments, isPending } = useGetData(
		`/treatment/${patient.patient_id}`,
		["treatment", "get_by_patient_id", patient.patient_id]
	);

	const {
		currentData: currentTreatments,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(treatments);

	if (isPending) return <Loading />;

	return (
		<>
			<TreatmentModal patient={patient} />
			<div className="w-9/12 mb-6">
				<div className="mb-2 flex justify-between">
					<h1 className="font-semibold text-3xl text-blue-600">
						Treatment
					</h1>
					<div className="flex gap-2 items-center">
						{role !== "Nurse" && (
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
							{currentTreatments.map((treatment, index) => {
								return (
									<TreatmentItem
										key={index}
										treatment={treatment}
										patientName={patientName}
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

TreatmentHistory.propTypes = { patient: PropTypes.object.isRequired };
