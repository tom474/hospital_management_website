import React from "react";
import { useState } from "react";

const patients = [
	{
		patient_id: 1,
		name: "John Doe",
		birth_date: "1999-08-01",
		address: "1 Nguyen Van Linh",
		email: "johndoe@gmail.com",
		phone: "0123456789",
	},
	{
		patient_id: 2,
		name: "Jane Smith",
		birth_date: "1985-03-12",
		address: "12 Tran Phu",
		email: "janesmith@gmail.com",
		phone: "0987654321",
	},
	{
		patient_id: 3,
		name: "Alice Johnson",
		birth_date: "1978-11-23",
		address: "15 Hai Ba Trung",
		email: "alice.johnson@gmail.com",
		phone: "0901234567",
	},
	{
		patient_id: 4,
		name: "Bob Brown",
		birth_date: "1992-07-15",
		address: "22 Le Loi",
		email: "bob.brown@gmail.com",
		phone: "0912345678",
	},
	{
		patient_id: 5,
		name: "Charlie Green",
		birth_date: "1989-09-30",
		address: "35 Phan Chu Trinh",
		email: "charlie.green@gmail.com",
		phone: "0923456789",
	},
	{
		patient_id: 6,
		name: "Daisy Miller",
		birth_date: "2000-02-28",
		address: "10 Hoang Dieu",
		email: "daisy.miller@gmail.com",
		phone: "0934567890",
	},
	{
		patient_id: 7,
		name: "Ethan Wilson",
		birth_date: "1987-05-16",
		address: "18 Nguyen Hue",
		email: "ethan.wilson@gmail.com",
		phone: "0945678901",
	},
	{
		patient_id: 8,
		name: "Fiona Davis",
		birth_date: "1995-12-01",
		address: "25 Le Thanh Ton",
		email: "fiona.davis@gmail.com",
		phone: "0956789012",
	},
	{
		patient_id: 9,
		name: "George White",
		birth_date: "1980-10-22",
		address: "7 Ly Thuong Kiet",
		email: "george.white@gmail.com",
		phone: "0967890123",
	},
	{
		patient_id: 10,
		name: "Hannah King",
		birth_date: "1993-04-09",
		address: "30 Dien Bien Phu",
		email: "hannah.king@gmail.com",
		phone: "0978901234",
	},
	{
		patient_id: 11,
		name: "Isaac Brown",
		birth_date: "1991-01-15",
		address: "40 Nguyen Trai",
		email: "isaac.brown@gmail.com",
		phone: "0981234567",
	},
];

export default function PatientTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const patientsPerPage = 10;
	const indexOfLastPatient = currentPage * patientsPerPage;
	const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
	const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);
	const totalPages = Math.ceil(patients.length / patientsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<table className="w-full">
				<thead>
					<tr className="bg-blue-400 text-white">
						<th className="p-2 border-[1px] border-white-400 border-solid">ID</th>
						<th className="p-2 border-[1px] border-white-400 border-solid">Name</th>
						<th className="p-2 border-[1px] border-white-400 border-solid">Birth Date</th>
						<th className="p-2 border-[1px] border-white-400 border-solid">Address</th>
						<th className="p-2 border-[1px] border-white-400 border-solid">Email</th>
						<th className="p-2 border-[1px] border-white-400 border-solid">Phone</th>
						<th className="p-2 border-[1px] border-white-400 border-solid">Actions</th>
					</tr>
				</thead>
				<tbody className="bg-white">
					{currentPatients.map((patient) => (
						<tr key={patient.patient_id} className="text-center">
							<td className="p-2 border-[1px] border-black-400 border-solid border-[1px] border-black-400 border-solid">{patient.patient_id}</td>
							<td className="p-2 border-[1px] border-black-400 border-solid">{patient.name}</td>
							<td className="p-2 border-[1px] border-black-400 border-solid">{patient.birth_date}</td>
							<td className="p-2 border-[1px] border-black-400 border-solid">{patient.address}</td>
							<td className="p-2 border-[1px] border-black-400 border-solid">{patient.email}</td>
							<td className="p-2 border-[1px] border-black-400 border-solid">{patient.phone}</td>
							<td className="p-2 border-[1px] border-black-400 border-solid">
								<button className="w-fit bg-blue-400 text-white p-2 border-[1px] border-black-400 border-solid">Details</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-center mb-5">
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => paginate(i + 1)}
						className={`px-3 py-1 mx-1 ${
							currentPage === i + 1 ? "bg-blue-400 text-white" : "bg-gray-200"
						} rounded`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</>
	);
}
