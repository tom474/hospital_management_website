import PropTypes from "prop-types";
import { useState } from "react";
import Select from "react-select";

const dummyPatients = [
	{ id: 1, name: "John Smith" },
	{ id: 2, name: "Emily Johnson" },
	{ id: 3, name: "Michael Brown" },
	{ id: 4, name: "Sarah Davis" },
	{ id: 5, name: "David Wilson" },
	{ id: 6, name: "Sarah Davis" },
	{ id: 7, name: "David Wilson" },
	{ id: 8, name: "Sarah Davis" },
	{ id: 9, name: "David Wilson" },
	{ id: 10, name: "Sarah Davis" },
	{ id: 11, name: "David Wilson" },
	{ id: 12, name: "Sarah Davis" },
	{ id: 13, name: "David Wilson" },
	{ id: 14, name: "Sarah Davis" },
	{ id: 15, name: "David Wilson" },
	{ id: 16, name: "Sarah Davis" },
	{ id: 17, name: "David Wilson" },
	{ id: 18, name: "Sarah Davis" },
	{ id: 19, name: "David Wilson" },
	{ id: 20, name: "Sarah Davis" }
];

export default function AppointmentModal({ date, doctor }) {
	const [appointment, setAppointment] = useState({
		doctor: doctor.firstName + " " + doctor.lastName,
		patient: null,
		startTime: "",
		endTime: "",
		defaultDate: date,
		status: "Booked",
		purpose: ""
	});

	// Handle input change
	const handleOnChange = (e) => {
		const { name, value } = e.target;

		// Handle other types of input (text, date, time, etc.)
		setAppointment((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		console.log(appointment);
	};

	const options = dummyPatients.map((patient) => ({
		value: {
			id: patient.id,
			name: patient.name
		},
		label: patient.name
	}));

	return (
		<dialog id={`appointment_modal_${doctor.id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<h3 className="font-bold text-lg text-blue-500">
					Create appointment
				</h3>
				<form onSubmit={onSubmit} method="dialog">
					<div
						onClick={() => {
							document
								.getElementById(
									`appointment_modal_${doctor.id}`
								)
								.close();
						}}
						className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2"
					>
						✕
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Doctor:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<input
								type="text"
								value={appointment.doctor}
								placeholder="Enter treatment date"
								name="doctor"
								id="doctor"
								disabled
								className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							/>
						</div>
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Patient:
						</label>
						<div>
							<Select
								value={appointment.patient}
								name="patient"
								onChange={(selectedOption) =>
									setAppointment((prev) => ({
										...prev,
										patient: selectedOption
									}))
								}
								options={options}
								placeholder="Select a patient..."
								isSearchable
								className="text-black font-medium border-sky-200 w-full"
							/>
						</div>
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Purpose:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<select
								defaultValue={"Choose appointment purpose..."}
								className="select select-bordered w-full bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							>
								<option disabled>
									Choose appointment purpose...
								</option>
								<option>Consultation</option>
								<option>Medical Checkup</option>
								<option>Lab Test</option>
								<option>Dermatology Consultation</option>
								<option>Vaccination</option>
							</select>
						</div>
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Date:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<input
								type="date"
								defaultValue={date}
								placeholder="Enter treatment date"
								name="date"
								id="date"
								className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
								disabled
							/>
						</div>
					</div>

					<div className="mt-3 flex gap-2">
						<div className="w-6/12">
							<label
								htmlFor="startTime"
								className="text-black text-sm"
							>
								Start Time:
							</label>
							<div className="flex items-center gap-3 mt-2">
								<input
									type="time"
									placeholder="Enter start time"
									name="startTime"
									id="startTime"
									value={appointment.startTime}
									onChange={handleOnChange}
									className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
								/>
							</div>
						</div>

						<div className="w-6/12">
							<label
								htmlFor="endTime"
								className="text-black text-sm"
							>
								End Time:
							</label>
							<div className="flex items-center gap-3 mt-2">
								<input
									type="time"
									placeholder="Enter end time"
									name="endTime"
									id="endTime"
									value={appointment.endTime}
									onChange={handleOnChange}
									className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
								/>
							</div>
						</div>
					</div>

					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							Save
						</button>
						<button
							type="reset"
							onClick={() => {
								document
									.getElementById(
										`appointment_modal_${doctor.id}`
									)
									.close();
							}}
							className="w-6/12 btn btn-outline btn-error text-white"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}

AppointmentModal.propTypes = {
	date: PropTypes.string.isRequired,
	doctor: PropTypes.object.isRequired
};
