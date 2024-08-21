import PropTypes from "prop-types";
import { useState } from "react";
import { formatSalary } from "../../../utils/common";

export default function StaffInformation({ staff }) {
	const [staffUpdate, setStaffUpdate] = useState(staff);
	const [isUpdate, setIsUpdate] = useState(false);

	const handleIsUpdate = () => {
		setIsUpdate((prev) => !prev);
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		console.log(name, value);
		setStaffUpdate((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(staffUpdate);
		setIsUpdate(false);
	};

	const role = localStorage.getItem("role");

	return (
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
							htmlFor="firstName"
							className="text-black text-sm"
						>
							First Name
						</label>
						{isUpdate ? (
							<input
								type="text"
								placeholder="Enter first name"
								value={staffUpdate.firstName}
								name="firstName"
								id="firstName"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{staffUpdate.firstName}
							</div>
						)}
					</div>

					<div className="w-6/12">
						<label
							htmlFor="lastName"
							className="text-black text-sm"
						>
							Last Name
						</label>
						{isUpdate ? (
							<input
								type="text"
								placeholder="Enter last name"
								value={staffUpdate.lastName}
								name="lastName"
								id="lastName"
								onChange={handleOnChange}
								className="input input-bordered w-full mt-2 text-black font-medium bg-slate-50 border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{staffUpdate.lastName}
							</div>
						)}
					</div>
				</div>

				<div className="flex gap-2 mt-3">
					<div className="w-6/12">
						<label htmlFor="salary" className="text-black text-sm">
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
						<label htmlFor="jobType" className="text-black text-sm">
							Job
						</label>
						{isUpdate ? (
							<div>
								<select
									defaultValue={staffUpdate.jobType}
									name="jobType"
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
								{staffUpdate.jobType}
							</div>
						)}
					</div>
				</div>

				<div className="mt-3">
					<label htmlFor="department" className="text-black text-sm">
						Department
					</label>
					{isUpdate ? (
						<div>
							<select
								defaultValue={staffUpdate.department}
								name="department"
								onChange={handleOnChange}
								className="select select-bordered w-full gap-2 bg-slate-50 border-sky-200 font-semibold"
							>
								<option disabled>Choose department</option>
								<option value={"Department 1"}>
									Department 1
								</option>
								<option value={"Department 2"}>
									Department 2
								</option>
								<option value={"Department 3"}>
									Department 3
								</option>
							</select>
						</div>
					) : (
						<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
							{staffUpdate.department}
						</div>
					)}
				</div>
				{isUpdate && (
					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							Update
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
	);
}

StaffInformation.propTypes = {
	staff: PropTypes.object.isRequired
};
