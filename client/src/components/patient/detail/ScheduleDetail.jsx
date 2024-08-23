import PropTypes from "prop-types";
import { displayStatus } from "../../../utils/common";

export default function ScheduleDetail({ schedule, isStaff = false }) {
	// The sketch page only display data from Mysql database, will handle data from Mongo later.
	// Including: Note during, after the schedule.

	const role = localStorage.getItem("role");

	return (
		<dialog id={`schedule_${schedule.id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<button
					onClick={() => {
						document
							.getElementById(`schedule_${schedule.id}`)
							.close();
					}}
					className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				>
					✕
				</button>
				<form>
					<div className="flex justify-between mt-4 mr-7 items-center">
						<h3 className="font-bold text-xl text-blue-600">
							Appointment #{schedule.id}
						</h3>

						<div>
							<p className="text-lg">{schedule.date}</p>
						</div>
					</div>

					<div className="flex justify-between mt-4 text-base mr-6">
						<div className="flex gap-10">
							<p>
								<span className="font-semibold">Doctor:</span>{" "}
								{schedule.doctor}
							</p>

							<p>
								<span className="font-semibold">Patient:</span>{" "}
								{schedule.patient}
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
									className="select select-bordered w-full bg-white"
								>
									<option>Scheduled</option>
									<option>Completed</option>
									<option>Cancelled</option>
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
									<input
										type="text"
										placeholder="Insert notes for this appointment"
										name="notes"
										className="input input-bordered w-full bg-white"
									/>
								</div>
							</div>
						</>
					)}
					{!isStaff &&
						(role == "Receptionist" || role == "Admin") &&
						schedule.status === "Scheduled" && (
							<div className="mt-5 flex gap-1">
								<button className="w-6/12 btn btn-success text-white">
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
								Update Appointment
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
				</form>
			</div>
		</dialog>
	);
}

ScheduleDetail.propTypes = {
	schedule: PropTypes.object.isRequired,
	isStaff: PropTypes.bool
};
