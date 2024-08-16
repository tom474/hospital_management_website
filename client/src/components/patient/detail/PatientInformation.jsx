import PropTypes from "prop-types";
import { useState } from "react";

export default function PatientInformation({ patient }) {
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
							htmlFor="firstName"
							className="text-black text-sm"
						>
							First Name
						</label>
						{isUpdate ? (
							<input
								type="text"
								placeholder="Enter first name"
								value={patientUpdate.firstName}
								name="firstName"
								id="firstName"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.firstName}
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
								value={patientUpdate.lastName}
								name="lastName"
								id="lastName"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.lastName}
							</div>
						)}
					</div>
				</div>

				<div className="flex gap-2 mt-3">
					<div className="w-6/12">
						<label
							htmlFor="phoneNumber"
							className="text-black text-sm"
						>
							Phone Number
						</label>
						{isUpdate ? (
							<input
								type="tel"
								placeholder="Enter phone number"
								value={patientUpdate.phoneNumber}
								name="phoneNumber"
								id="phoneNumber"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.phoneNumber}
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
								value={patientUpdate.birthDate}
								name="birthDate"
								id="Birthday"
								onChange={handleOnChange}
								className="input input-bordered w-full bg-slate-50 mt-2 text-black font-medium border-sky-200"
							/>
						) : (
							<div className="font-semibold text-black w-full py-2 px-3 rounded-lg border-[1px] border-solid border-gray-400 bg-slate-100">
								{patientUpdate.birthDate}
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
							Update
						</button>
						<button
							type="reset"
							onClick={() => setIsUpdate(false)}
							className="w-6/12 btn btn-outline btn-error text-white"
						>
							cancel
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
