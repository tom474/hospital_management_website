import { useExtractSearchParams, usePaginate } from "../../../utils/common";
import { useGetData } from "../../../api/apiHooks";
import Loading from "../../utils/Loading";
import StaffItem from "./StaffItem";
import EmptyData from "../../utils/EmptyData";

const columns = [
	{ key: "ID", title: "ID", size: "w-[2%]" },
	{ key: "Name", title: "Name", size: "w-[10%]" },
	{ key: "Email", title: "Email", size: "w-[7%]" },
	{ key: "JobType", title: "Job Type", size: "w-1/12" },
	{ key: "Department", title: "Department", size: "w-1/12" },
	{ key: "Manager", title: "Manager", size: "w-1/12" },
	{ key: "Salary", title: "Salary", size: "w-1/12" },
	{ key: "Action", title: "Action", size: "w-[0%]" }
];

export default function StaffTable() {
	const order = useExtractSearchParams("order");
	const department = useExtractSearchParams("department");

	let query = {
		url: "/staff",
		key: ["staff"]
	};

	if (order && department) {
		query.url += `?order=${order}&department_id=${department}`;
		query.key = ["staff", "filter_order_department", order, department];
	} else if (order) {
		query.url += `?order=${order}`;
		query.key = ["staff", "filter_order", order];
	} else if (department) {
		query.url += `?department_id=${department}`;
		query.key = ["staff", "filter_department", department];
	}

	const { data, isPending } = useGetData(query.url, query.key);

	const {
		currentData: staffs,
		currentPage,
		paginate,
		totalPages
	} = usePaginate(data);

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
										column.key == "JobType" && "text-center"
									}`}
								>
									{column.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{staffs.map((staff) => (
							<StaffItem key={staff.staff_id} staff={staff} />
						))}
					</tbody>
				</table>
				{staffs.length === 0 && <EmptyData>No staff found.</EmptyData>}
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
