import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useGetData } from "../../../api/apiHooks";
import {
	formatDate,
	useExtractSearchParams,
	usePaginate
} from "../../../utils/common";
import Loading from "../../utils/Loading";
import EmptyData from "../../utils/EmptyData";

const columns = [
	{ key: "ID", title: "ID", size: "w-[2%]" },
	{ key: "Name", title: "Name", size: "w-[13%]" },
	{ key: "Birth Date", title: "Birth Date", size: "w-[12%]" },
	{ key: "Address", title: "Address", size: "w-2/12" },
	{ key: "Email", title: "Email", size: "w-2/12" },
	{ key: "Phone", title: "Phone", size: "w-1/12" },
	{ key: "action", title: "Action", size: "w-[0%]" }
];

export default function PatientTable() {
	const name = useExtractSearchParams("name");
	const id = useExtractSearchParams("id");

	let query = {
		url: "/patient",
		key: ["patient"]
	};

	if (name) {
		query.url = `/patient/search/name?name=${name}`;
		query.key = ["patients", "search_by_name", name];
	}

	if (id) {
		query.url = `/patient/search/id?id=${id}`;
		query.key = ["patients", "search_by_id", id];
	}

	const { data, isPending } = useGetData(query.url, query.key);

	const { currentData, currentPage, paginate, totalPages } =
		usePaginate(data);

	if (isPending) return <Loading />;

	return (
		<>
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
						{data &&
							currentData.map((patient, index) => (
								<tr key={index}>
									<td className="align-top font-bold text-blue-600">
										{patient.patient_id}
									</td>
									<td className="align-top text-black ">
										{patient.first_name} {patient.last_name}
									</td>
									<td className="align-top text-black">
										{formatDate(patient.birth_date)}
									</td>
									<td className="align-top text-black">
										{patient.address}
									</td>
									<td className="align-top text-black">
										{patient.email}
									</td>
									<td className="align-top text-black">
										{patient.phone}
									</td>
									<td className="align-top text-black">
										<Link
											to={`${patient.patient_id}`}
											className="btn btn-outline rounded-full btn-success hover:text-white"
										>
											<FontAwesomeIcon icon={faEye} />
										</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{currentData.length === 0 && (
					<EmptyData>No Patient Found.</EmptyData>
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
