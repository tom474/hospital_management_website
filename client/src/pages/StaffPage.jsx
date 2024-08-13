import StaffTable from "../components/staff/main/StaffTable";

export default function StaffPage() {
	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">
				Staff Management
			</h1>
			<StaffTable />
		</div>
	);
}
