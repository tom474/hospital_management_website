import PropTypes from "prop-types";
import { displayStatus, formatDate } from "../../../utils/common";
import { useState } from "react";
import { usePutData } from "../../../api/apiHooks";
import { queryClient } from "../../../api";
import Loading from "../../utils/Loading";

export default function ScheduleDetail({
	schedule,
	doctorName,
	patientName,
	isStaff = false
}) {
	const { mutate, isPending } = usePutData({
		onSuccess: () => {
			queryClient.invalidateQueries("appointment");
			document
				.getElementById(`schedule_${schedule.appointment_id}`)
				.close();
		}
	});
	const [updateAttribute, setUpdateAttribute] = useState({
		status: schedule.status,
		notes: ""
	});

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setUpdateAttribute((prev) => ({ ...prev, [name]: value }));
	};

	const role = localStorage.getItem("role");

	const onSubmit = (e) => {
		e.preventDefault();
		mutate({
			url: `/appointment/${schedule.appointment_id}`,
			post: {
				status: updateAttribute.status,
				notes: updateAttribute.notes
			}
		});
	};

	const onCancelAppointment = () => {
		mutate({
			url: `/appointment/${schedule.appointment_id}`,
			post: {
				status: "Cancelled",
				notes: updateAttribute.notes
			}
		});
	};

	return (
		<dialog id={`schedule_${schedule.appointment_id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<button
					onClick={() => {
						document
							.getElementById(
								`schedule_${schedule.appointment_id}`
							)
							.close();
					}}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				>
					✕
				</button>
				<form onSubmit={onSubmit}>
					<div className="flex justify-between mt-4 mr-7 items-center">
						<h3 className="font-bold text-xl text-blue-600">
							Appointment #{schedule.appointment_id}
						</h3>

						<div>
							<p className="text-lg">
								{formatDate(schedule.date)}
							</p>
						</div>
					</div>

					<div className="flex justify-between mt-4 text-base mr-6">
						<div className="flex gap-10">
							<p>
								<span className="font-semibold">Doctor:</span>{" "}
								{doctorName}
							</p>

							<p>
								<span className="font-semibold">Patient:</span>{" "}
								{patientName}
							</p>
						</div>

						{displayStatus(schedule.status)}
					</div>

					<div className="mt-4">
						<p>
							<span className="font-semibold text-lg">
								Purpose
							</span>{" "}
						</p>

						<p className="text-base p-3 rounded bg-slate-300 mt-2">
							{schedule.purpose}
						</p>
					</div>
					{isStaff && (
						<>
							<div className="mt-4">
								<label
									htmlFor="status"
									className="font-semibold text-lg"
								>
									Status
								</label>
								<select
									id="status"
									name="status"
									value={updateAttribute.status}
									onChange={handleOnChange}
									className="select select-bordered w-full bg-white"
								>
									<option value={"Scheduled"}>
										Scheduled
									</option>
									<option value={"Completed"}>
										Completed
									</option>
									<option value={"Cancelled"}>
										Cancelled
									</option>
								</select>
							</div>

							<div className="mt-4">
								<label
									htmlFor="note"
									className="font-semibold text-lg"
								>
									Notes
								</label>
								<div>
									<textarea
										type="text"
										placeholder="Insert notes for this appointment"
										name="notes"
										value={updateAttribute.notes}
										onChange={handleOnChange}
										className="textarea textarea-bordered w-full bg-white"
									/>
								</div>
							</div>
						</>
					)}
					{!isStaff &&
						(role == "Receptionist" || role == "Admin") &&
						schedule.status === "Scheduled" && (
							<div className="mt-5 flex gap-1">
								<button
									onClick={onCancelAppointment}
									className="w-6/12 btn btn-success text-white"
								>
									Cancel Appointment
								</button>
								<button
									type="reset"
									onClick={() => {
										document
											.getElementById(
												`schedule_${schedule.id}`
											)
											.close();
									}}
									className="w-6/12 btn btn-outline btn-error text-white"
								>
									Close
								</button>
							</div>
						)}

					{(role == "Receptionist" || role == "Admin") && isStaff && (
						<div className="mt-5 flex gap-1">
							<button className="w-6/12 btn btn-success text-white">
								{isPending ? (
									<Loading isFull={false} />
								) : (
									"Update Appointment"
								)}
							</button>
							<button
								type="reset"
								onClick={() => {
									document
										.getElementById(
											`schedule_${schedule.appointment_id}`
										)
										.close();
								}}
								className="w-6/12 btn btn-outline btn-error text-white"
							>
								Close
							</button>
						</div>
					)}
				</form>
			</div>
		</dialog>
	);
}

ScheduleDetail.propTypes = {
	schedule: PropTypes.object.isRequired,
	isStaff: PropTypes.bool,
	doctorName: PropTypes.string,
	patientName: PropTypes.string
};
