import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostData } from "../api/apiHooks";
import { queryClient } from "../api";

export default function AddPatientPage() {
	const navigate = useNavigate();
	const { mutate, isPending } = usePostData({
		onSuccess: () => {
			queryClient.invalidateQueries("patient");
			navigate("/patient");
		}
	});

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		birthDate: "",
		address: "",
		email: "",
		phoneNumber: "",
		allergies: ""
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
		mutate({
			url: "/patient",
			post: {
				first_name: formData.firstName,
				last_name: formData.lastName,
				birth_date: formData.birthDate,
				address: formData.address,
				email: formData.email,
				phone: formData.phoneNumber,
				allergies: formData.allergies
			}
		});
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
					Add New Patient
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
						<label className="block text-gray-700">
							Birth Date:
						</label>
						<input
							type="date"
							name="birthDate"
							value={formData.birthDate}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Address:</label>
						<input
							type="text"
							name="address"
							value={formData.address}
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
						<label className="block text-gray-700">
							Phone Number:
						</label>
						<input
							type="tel"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">
							Allergies:
						</label>
						<input
							type="text"
							name="allergies"
							value={formData.allergies}
							onChange={handleChange}
							className="w-full px-3 py-2 border rounded-lg bg-white"
						/>
					</div>
					<button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
						{isPending ? (
							<span className="loading loading-spinner loading-sm"></span>
						) : (
							"Add Patient"
						)}
					</button>
				</form>
			</div>
		</>
	);
}
