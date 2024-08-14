import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddStaffPage() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		jobType: "",
		email: "",
		department: "",
		salary: 0
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log(formData);
	};

	return (
		<>
			<div className="mb-3 mt-5">
				<Link
					className="text-2xl  font-bold cursor-pointer transition ease-in-out hover:text-blue-600"
					to={"/patient"}
				>
					Back
				</Link>
			</div>
			<div className="w-full mx-auto  mb-10 p-6 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-blue-400">
					Add New Staff
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">
							First Name:
						</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">
							Last Name:
						</label>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Job:</label>
						<div>
							<select
								defaultValue={formData.jobType}
								name="jobType"
								onChange={handleChange}
								className="select select-bordered w-full gap-2 bg-white font-semibold"
							>
								<option disabled>Choose job</option>
								<option value={"Doctor"}>Doctor</option>
								<option value={"Nurse"}>Nurse</option>
								<option value={"Receptionist"}>
									Receptionist
								</option>
							</select>
						</div>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Salary Number:
						</label>
						<label className="input input-bordered flex items-center gap-2 bg-white">
							<p>đ</p>
							<input
								type="number"
								placeholder="Enter salary"
								value={formData.salary}
								name="salary"
								id="salary"
								onChange={handleChange}
								className=" w-full bg-slate-50 text-black font-medium border-sky-200"
							/>
						</label>
					</div>

					<div className="mb-4">
						<label
							htmlFor="department"
							className="text-black text-sm"
						>
							Department
						</label>
						<div>
							<select
								defaultValue={formData.department}
								name="department"
								onChange={handleChange}
								className="select select-bordered w-full gap-2 bg-white font-semibold"
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
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
					>
						Add Patient
					</button>
				</form>
			</div>
		</>
	);
}
