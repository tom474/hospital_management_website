import PropTypes from "prop-types";
import { useState } from "react";
import Select from "react-select";
import { useGetData, usePostData } from "../../../api/apiHooks";
import { queryClient } from "../../../api";
import Loading from "../../utils/Loading";
import { adjustDateByOneDay } from "../../../utils/common";

export default function AppointmentModal({
	date,
	doctor,
	minTime,
	maxTime,
	index
}) {
	const { mutate, isPending } = usePostData({
		onSuccess: () => {
			queryClient.invalidateQueries("appointment");
			queryClient.invalidateQueries("available_staffs");
			queryClient.invalidateQueries("busy_staffs");
			document
				.getElementById(`appointment_modal_${doctor.staff_id}_${index}`)
				.close();
		}
	});

	const { data: patients } = useGetData(`/patient`, ["patient"]);
	const [appointment, setAppointment] = useState({
		doctor: doctor.first_name + " " + doctor.last_name,
		patient: null,
		startTime: "",
		endTime: "",
		defaultDate: date,
		status: "Scheduled",
		purpose: "",
		notes: ""
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
		mutate({
			url: "/appointment",
			post: {
				patient_id: appointment.patient.value.id,
				staff_id: doctor.staff_id,
				date: adjustDateByOneDay(appointment.defaultDate),
				start_time: appointment.startTime,
				end_time: appointment.endTime,
				purpose: appointment.purpose,
				notes: appointment.notes
			}
		});
	};

	let options = [];
	if (patients) {
		options = patients.map((patient) => ({
			value: {
				id: patient.patient_id,
				name: patient.first_name + " " + patient.last_name
			},
			label: patient.first_name + " " + patient.last_name
		}));
	}

	return (
		<dialog
			id={`appointment_modal_${doctor.staff_id}_${index}`}
			className="modal"
		>
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<h3 className="font-bold text-lg text-blue-500">
					Create appointment
				</h3>
				<form onSubmit={onSubmit} method="dialog">
					<div
						onClick={() => {
							document
								.getElementById(
									`appointment_modal_${doctor.staff_id}_${index}`
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
								value={appointment.purpose}
								onChange={handleOnChange}
								name="purpose"
								className="select select-bordered w-full bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							>
								<option disabled>
									Choose appointment purpose...
								</option>
								<option value={"Consultation"}>
									Consultation
								</option>
								<option value={"Medical Checkup"}>
									Medical Checkup
								</option>
								<option value={"Lab Test"}>Lab Test</option>
								<option value={"Dermatology Consultation"}>
									Dermatology Consultation
								</option>
								<option value={"Vaccination"}>
									Vaccination
								</option>
							</select>
						</div>
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Notes:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<textarea
								value={appointment.notes}
								onChange={handleOnChange}
								placeholder="Enter notes"
								name="notes"
								id="notes"
								className="input input-bordered resize-none flex-1 h-20 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							/>
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
									min={minTime}
									max={maxTime}
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
									min={minTime}
									max={maxTime}
									value={appointment.endTime}
									onChange={handleOnChange}
									className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
								/>
							</div>
						</div>
					</div>
					<p className="text-center mt-3">
						You can only create an appointment between{" "}
						<span className="text-blue-600 font-bold">
							{minTime}
						</span>{" "}
						and{" "}
						<span className="text-blue-600 font-bold">
							{maxTime}
						</span>
					</p>

					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							{isPending ? <Loading isFull={false} /> : "Save"}
						</button>
						<button
							type="reset"
							onClick={() => {
								document
									.getElementById(
										`appointment_modal_${doctor.staff_id}_${index}`
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
	doctor: PropTypes.object.isRequired,
	minTime: PropTypes.string.isRequired,
	maxTime: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};
