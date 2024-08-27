import PropTypes from "prop-types";
import { useState } from "react";
import { adjustDateByOneDay, formatDate } from "../../../utils/common";
import { queryClient } from "../../../api";
import Loading from "../../utils/Loading";
import { usePutData } from "../../../api/apiHooks";

export default function PatientInformation({ patient }) {
	const { mutate, isPending } = usePutData({
		onSuccess: () => {
			queryClient.invalidateQueries([
				"patient",
				"get_by_id",
				patient.patient_id
			]);
		}
	});

	patient.birth_date = formatDate(patient.birth_date);
	const [patientUpdate, setPatientUpdate] = useState(patient);
	const [isUpdate, setIsUpdate] = useState(false);

	const handleIsUpdate = () => {
		setIsUpdate((prev) => !prev);
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setPatientUpdate((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(patientUpdate);
		mutate({
			url: `/patient/${patient.patient_id}`,
			post: {
				first_name: patientUpdate.first_name,
				last_name: patientUpdate.last_name,
				birth_date: adjustDateByOneDay(patientUpdate.birth_date),
				address: patientUpdate.address,
				email: patientUpdate.email,
				phone: patientUpdate.phone,
				allergies: patientUpdate.allergies
			}
		});
		setIsUpdate(false);
	};

	const role = localStorage.getItem("role");

	return (
		<form onSubmit={onSubmit} className="w-9/12 mb-6">
			<div className="mb-2 flex justify-between">
				<h1 className="font-semibold text-3xl text-blue-600">
					Personal Information
				</h1>
				{(role === "Admin" || role === "Receptionist") && (
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
							value={patientUpdate.email}
							name="email"
							id="email"
							onChange={handleOnChange}
							className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
						/>
					) : (
						<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
							{patientUpdate.email}
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
								value={patientUpdate.first_name}
								name="first_name"
								id="first_name"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.first_name}
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
								value={patientUpdate.last_name}
								name="last_name"
								id="last_name"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.last_name}
							</div>
						)}
					</div>
				</div>

				<div className="flex gap-2 mt-3">
					<div className="w-6/12">
						<label htmlFor="phone" className="text-black text-sm">
							Phone Number
						</label>
						{isUpdate ? (
							<input
								type="tel"
								placeholder="Enter phone number"
								value={patientUpdate.phone}
								name="phone"
								id="phone"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.phone}
							</div>
						)}
					</div>

					<div className="w-6/12">
						<label
							htmlFor="Birthday"
							className="text-black text-sm"
						>
							Birthday
						</label>
						{isUpdate ? (
							<input
								type="date"
								placeholder="Enter birthday"
								value={patientUpdate.birth_date}
								name="birth_date"
								id="Birthday"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.birth_date}
							</div>
						)}
					</div>
				</div>

				<div className="mt-3">
					<label htmlFor="address" className="text-black text-sm">
						Address
					</label>
					{isUpdate ? (
						<input
							type="text"
							placeholder="Enter Address"
							value={patientUpdate.address}
							name="address"
							id="address"
							onChange={handleOnChange}
							className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
						/>
					) : (
						<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
							{patientUpdate.address}
						</div>
					)}
				</div>

				<div className="mt-3">
					<label htmlFor="allergies" className="text-black text-sm">
						Allergies
					</label>
					{isUpdate ? (
						<input
							type="text"
							placeholder="Enter allergies"
							value={patientUpdate.allergies}
							name="allergies"
							id="allergies"
							onChange={handleOnChange}
							className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
						/>
					) : (
						<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
							{patientUpdate.allergies}
						</div>
					)}
				</div>
				{isUpdate && (
					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							{isPending ? <Loading /> : "Update"}
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

PatientInformation.propTypes = {
	patient: PropTypes.object.isRequired
};
