import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useGetData, usePostData } from "../api/apiHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FileDisplay from "../components/utils/FileDisplay";
import { queryClient } from "../api";
import { fileToBase64 } from "../utils/common";
import Loading from "../components/utils/Loading";

export default function AddStaffPage() {
	const navigate = useNavigate();
	const { mutate, isPending } = usePostData({
		onSuccess: () => {
			queryClient.invalidateQueries(["staff"]);
			navigate("/staff");
		}
	});

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		jobType: "Doctor",
		email: "",
		manager: null,
		department_id: 1,
		salary: 0,
		certificate: null,
		qualification: ""
	});

	const { data: departments } = useGetData("/department", ["department"]);
	const { data: staffs } = useGetData(
		`/staff?department_id=${formData.department_id}`,
		["staff", "get_by_department", formData.department_id]
	);

	const handleChange = (e) => {
		const { name, type, value, files } = e.target;

		// Handle file input
		if (type === "file") {
			setFormData((prev) => ({ ...prev, [name]: files[0] }));
		} else {
			// Handle other types of input (text, date, time, etc.)
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleRemoveFile = ({ name }) => {
		setFormData((prev) => ({ ...prev, [name]: null }));
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

	console.log(options);
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log(formData);
		const file = await fileToBase64(formData.certificate);
		mutate({
			url: "/staff",
			post: {
				first_name: formData.firstName,
				last_name: formData.lastName,
				email: formData.email,
				salary: formData.salary,
				job_type: formData.jobType,
				qualifications: formData.qualification,
				manager_id: formData.manager.value.id,
				department_id: formData.department_id,
				certificate: file
			}
		});
	};

	return (
		<>
			<div className="mb-3 mt-5">
				<Link
					className="text-2xl font-bold cursor-pointer transition ease-in-out hover:text-blue-600"
					to={"/staff"}
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
						<label className="block text-gray-700">Salary: </label>
						<label className="input input-bordered flex items-center gap-2 bg-white">
							<p>$</p>
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
						<label
							htmlFor="department_id"
							className="text-black text-sm"
						>
							Department
						</label>
						<div>
							<select
								defaultValue={formData.department_id}
								name="department_id"
								onChange={handleChange}
								className="select select-bordered w-full gap-2 bg-white font-semibold"
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
					</div>

					<div className="mb-4">
						<label htmlFor="doctor" className="text-black text-sm">
							Manager
						</label>
						<Select
							value={formData.manager}
							name="manager"
							onChange={(selectedOption) =>
								setFormData((prev) => ({
									...prev,
									manager: selectedOption
								}))
							}
							options={options}
							placeholder="Select a doctor..."
							isSearchable
							className="text-black font-medium border-sky-200 mt-3"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">
							Qualification:
						</label>
						<input
							type="text"
							name="qualification"
							value={formData.qualification}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>

					<div className="mt-5 mb-4">
						<div className="flex justify-between">
							<p className="text-black">Certificate:</p>
							<label
								htmlFor="certificate"
								className="text-black text-sm mr-2 p-2 rounded-full hover:bg-green-100 hover:text-green-400 cursor-pointer"
							>
								<FontAwesomeIcon icon={faPlus} />
							</label>
						</div>

						<input
							type="file"
							onChange={handleChange}
							name="certificate"
							id="certificate"
							className="hidden"
						/>
						{formData.certificate === null && (
							<div className="flex justify-center border rounded-md p-2">
								<p className="text-blue-500 text-xs">
									*Please upload your highest certificate
								</p>
							</div>
						)}
						{formData.certificate && (
							<FileDisplay
								fileName={formData.certificate.name}
								size={(
									formData.certificate.size /
									(1024 * 1024)
								).toFixed(1)}
								onRemove={handleRemoveFile}
								name="certificate"
							/>
						)}
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
					>
						{isPending ? <Loading isFull={false} /> : "Add Staff"}
					</button>
				</form>
			</div>
		</>
	);
}
