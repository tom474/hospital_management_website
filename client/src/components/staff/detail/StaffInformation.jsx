import PropTypes from "prop-types";
import { useState } from "react";
import { fileToBase64, formatSalary } from "../../../utils/common";
import Select from "react-select";
import { useGetData, usePutData } from "../../../api/apiHooks";
import ImageModal from "../../utils/ImageModal";
import { queryClient } from "../../../api";
import Loading from "../../utils/Loading";

export default function StaffInformation({ staff }) {
	const { mutate, isPending } = usePutData({
		onSuccess: () => {
			queryClient.invalidateQueries("staff");
		}
	});
	const [staffUpdate, setStaffUpdate] = useState(staff);
	const [isUpdate, setIsUpdate] = useState(false);
	const { data: manager } = useGetData(`/staff/id/${staff.manager_id}`, [
		"staff",
		"get_by_id",
		staff.manager_id
	]);
	const { data: department } = useGetData(
		`/department/id/${staff.department_id}`,
		["department", "get_by_id", staff.department_id]
	);
	const { data: departments } = useGetData(`/department`, ["department"]);
	const { data: staffs } = useGetData(
		`/staff?department_id=${staffUpdate.department_id}`,
		["staff", "get_by_department", staffUpdate.department_id]
	);

	const staffManager = manager
		? manager[0].first_name + " " + manager[0].last_name
		: "None";

	const handleIsUpdate = () => {
		setIsUpdate((prev) => !prev);
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		setStaffUpdate((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		mutate({
			url: `/staff/${staffUpdate.staff_id}`,
			post: {
				first_name: staffUpdate.first_name,
				last_name: staffUpdate.last_name,
				email: staffUpdate.email,
				salary: staffUpdate.salary,
				job_type: staffUpdate.job_type,
				qualifications: staffUpdate.qualifications,
				manager_id: staffUpdate.manager_id,
				department_id: staffUpdate.department_id,
				certificate: staffUpdate.certificate
					? staffUpdate.certificate.data
					: ""
			}
		});
		setIsUpdate(false);
	};

	let options = [];

	if (staffs) {
		options = staffs.map((doctor) => ({
			value: {
				id: doctor.staff_id,
				name: doctor.first_name + " " + doctor.last_name
			},
			label: doctor.first_name + " " + doctor.last_name
		}));
	}

	const role = localStorage.getItem("role");

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const base64 = await fileToBase64(file);
			setStaffUpdate((prev) => ({
				...prev,
				certificate: { data: base64 }
			}));
		}
	};

	return (
		<>
			{staff.certificate && (
				<ImageModal
					imageUrl={staffUpdate.certificate.data}
					modalId={"certificate_" + staffUpdate.staff_id}
				/>
			)}

			<form onSubmit={onSubmit} className="w-9/12 mb-6">
				<div className="mb-2 flex justify-between">
					<h1 className="font-semibold text-3xl text-blue-600">
						Staff Information
					</h1>

					{role === "Admin" && (
						<div
							onClick={handleIsUpdate}
							className={`btn btn-outline ${
								isUpdate ? "btn-error" : "btn-primary"
							} `}
						>
							{isUpdate ? "Cancel" : "Modify"}
						</div>
					)}
				</div>
				<div className="border-[1px] rounded-lg border-solid border-gray-400 p-2">
					<div>
						<label htmlFor="email" className="text-black text-sm">
							Email
						</label>
						{isUpdate ? (
							<input
								type="email"
								placeholder="Enter email"
								value={staffUpdate.email}
								name="email"
								id="email"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{staffUpdate.email}
							</div>
						)}
					</div>

					<div className="flex gap-2 mt-3">
						<div className="w-6/12">
							<label
								htmlFor="first_name"
								className="text-black text-sm"
							>
								First Name
							</label>
							{isUpdate ? (
								<input
									type="text"
									placeholder="Enter first name"
									value={staffUpdate.first_name}
									name="first_name"
									id="first_name"
									onChange={handleOnChange}
									className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
								/>
							) : (
								<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
									{staffUpdate.first_name}
								</div>
							)}
						</div>

						<div className="w-6/12">
							<label
								htmlFor="last_name"
								className="text-black text-sm"
							>
								Last Name
							</label>
							{isUpdate ? (
								<input
									type="text"
									placeholder="Enter last name"
									value={staffUpdate.last_name}
									name="last_name"
									id="last_name"
									onChange={handleOnChange}
									className="input input-bordered w-full mt-2 text-black font-medium bg-slate-50 border-sky-200"
								/>
							) : (
								<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
									{staffUpdate.last_name}
								</div>
							)}
						</div>
					</div>

					<div className="flex gap-2 mt-3">
						<div className="w-6/12">
							<label
								htmlFor="salary"
								className="text-black text-sm"
							>
								Salary
							</label>
							{isUpdate ? (
								<label className="input input-bordered flex items-center gap-2 bg-slate-50 border-sky-200">
									<p>$</p>
									<input
										type="number"
										placeholder="Enter salary name"
										value={staffUpdate.salary}
										name="salary"
										id="salary"
										onChange={handleOnChange}
										className=" w-full bg-slate-50 text-black font-medium border-sky-200"
									/>
								</label>
							) : (
								<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
									{formatSalary(staffUpdate.salary)}
								</div>
							)}
						</div>

						<div className="w-6/12">
							<label
								htmlFor="job_type"
								className="text-black text-sm"
							>
								Job
							</label>
							{isUpdate ? (
								<div>
									<select
										defaultValue={staffUpdate.job_type}
										name="job_type"
										onChange={handleOnChange}
										className="select select-bordered w-full gap-2 bg-slate-50 border-sky-200 font-semibold"
									>
										<option disabled>Choose job</option>
										<option value={"Doctor"}>Doctor</option>
										<option value={"Nurse"}>Nurse</option>
										<option value={"Receptionist"}>
											Receptionist
										</option>
									</select>
								</div>
							) : (
								<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
									{staffUpdate.job_type}
								</div>
							)}
						</div>
					</div>

					<div className="mt-3">
						<label
							htmlFor="doctor"
							className="text-black text-sm mb-2"
						>
							Manager:
						</label>
						{isUpdate ? (
							<Select
								value={
									options.filter(
										(option) =>
											option.value.id ===
											staffUpdate.manager_id
									)[0]
								}
								name="manager"
								onChange={(selectedOption) =>
									setStaffUpdate((prev) => ({
										...prev,
										manager_id: selectedOption.value.id
									}))
								}
								options={options}
								placeholder="Select a doctor..."
								isSearchable
								className="text-black font-medium border-sky-200 "
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{staffManager}
							</div>
						)}
					</div>

					<div className="mt-3">
						<label
							htmlFor="department"
							className="text-black text-sm"
						>
							Department
						</label>
						{isUpdate ? (
							<div>
								<select
									defaultValue={staffUpdate.department_id}
									name="department_id"
									onChange={handleOnChange}
									className="select select-bordered w-full gap-2 bg-slate-50 border-sky-200 font-semibold"
								>
									<option disabled>Choose department</option>
									{departments &&
										departments.map((department) => (
											<option
												key={department.department_id}
												value={department.department_id}
											>
												{department.department_name}
											</option>
										))}
								</select>
							</div>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{department && department[0].department_name}
							</div>
						)}
					</div>
					<div className="mt-3">
						<label htmlFor="email" className="text-black text-sm">
							Qualification
						</label>
						{isUpdate ? (
							<input
								type="text"
								placeholder="Enter Qualification"
								value={staffUpdate.qualifications}
								name="qualifications"
								id="qualifications"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{staffUpdate.qualifications}
							</div>
						)}
					</div>
					{staff.certificate && (
						<div className="mt-3">
							<label
								htmlFor="email"
								className="text-black text-sm"
							>
								Certificate
							</label>
							{isUpdate ? (
								<div className="flex justify-center font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
									<label htmlFor="certificate">
										<img
											src={staffUpdate.certificate.data}
											alt="certificate"
										/>
									</label>
									<input
										type="file"
										id="certificate"
										name="certificate"
										onChange={handleFileChange}
										hidden
									/>
								</div>
							) : (
								<div className="flex justify-center font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
									<img
										onClick={() => {
											document
												.getElementById(
													"certificate_" +
														staffUpdate.staff_id
												)
												.showModal();
										}}
										src={staffUpdate.certificate.data}
										className="hover:opacity-85 cursor-pointer"
										alt="certificate"
									/>
								</div>
							)}
						</div>
					)}

					{isUpdate && (
						<div className="mt-5 flex gap-1">
							<button className="w-6/12 btn btn-success text-white">
								{isPending ? (
									<Loading isFull={false} />
								) : (
									"Update"
								)}
							</button>
							<button
								type="reset"
								onClick={() => setIsUpdate(false)}
								className="w-6/12 btn btn-outline btn-error text-white"
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			</form>
		</>
	);
}

StaffInformation.propTypes = {
	staff: PropTypes.object.isRequired
};
