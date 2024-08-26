import PropTypes from "prop-types";
import { useState } from "react";

export default function StaffScheduleModal({ staff }) {
	const [scheduleUpdate, setScheduleUpdate] = useState({
		staff: {
			id: staff.id,
			firstName: staff.firstName,
			lastName: staff.lastName
		},
		date: null,
		shift: "General Shift",
		startTime: "08:00",
		endTime: "17:00"
	});

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		if (name === "shift") {
			const shiftValue = JSON.parse(value); // Parse the stringified object
			setScheduleUpdate((prev) => ({
				...prev,
				shift: shiftValue.shift,
				startTime: shiftValue.startTime,
				endTime: shiftValue.endTime
			}));
		} else {
			setScheduleUpdate((prev) => ({ ...prev, [name]: value }));
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(scheduleUpdate);

		document.getElementById(`staff_schedule_modal`).close();
	};

	return (
		<dialog id={`staff_schedule_modal`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<form onSubmit={onSubmit} method="dialog">
					<button
						onClick={() => {
							document
								.getElementById(`staff_schedule_modal`)
								.close();
						}}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>

					<h1 className="font-bold text-xl text-blue-600 ">
						Create Schedule
					</h1>

					<div className="mt-3">
						<label htmlFor="staff" className="text-black text-sm">
							Staff
						</label>
						<div className="mt-1">
							<input
								type="text"
								value={
									scheduleUpdate.staff.firstName +
									" " +
									scheduleUpdate.staff.lastName
								}
								name="staff"
								id="staff"
								disabled
								className="input input-bordered flex-1 h-10 bg-white text-black font-medium border-[1px] border-gray-300 rounded-[4px] w-full"
							/>
						</div>
					</div>

					<div className="mt-3">
						<label
							htmlFor="dayOfWeek"
							className="text-black text-sm"
						>
							Date
						</label>

						<div className="mt-2">
							<input
								type="date"
								value={scheduleUpdate.date}
								onChange={handleOnChange}
								name="date"
								id="date"
								className="input input-bordered bg-white flex-1 h-10 text-black font-medium border-[1px] border-gray-300 rounded-[4px] w-full"
							/>
						</div>
					</div>

					<div className="mt-3">
						<label htmlFor="shift" className="text-black text-sm">
							Shift
						</label>

						<div className="mt-2">
							<select
								name="shift"
								value={JSON.stringify({
									shift: scheduleUpdate.shift,
									startTime: scheduleUpdate.startTime,
									endTime: scheduleUpdate.endTime
								})}
								onChange={handleOnChange}
								className="select select-bordered w-full gap-2 bg-slate-50 border-sky-200 font-semibold"
							>
								<option disabled>Choose the shift</option>
								<option
									value={JSON.stringify({
										shift: "General Shift",
										startTime: "08:00",
										endTime: "17:00"
									})}
								>
									General Shift (08:00 - 17:00)
								</option>
								<option
									value={JSON.stringify({
										shift: "Night Shift",
										startTime: "18:00",
										endTime: "02:00"
									})}
								>
									Night Shift (18:00 - 02:00)
								</option>
							</select>
						</div>

						<div className="mt-2 flex gap-2">
							<div className="w-6/12">
								<label
									htmlFor="startTime"
									className="text-black text-sm"
								>
									Start Time
								</label>
								<div className="mt-1">
									<input
										type="time"
										value={scheduleUpdate.startTime}
										name="startTime"
										id="startTime"
										className="input input-bordered flex-1 h-10 text-black font-medium border-[1px] border-gray-300 rounded-[4px] w-full"
										disabled
									/>
								</div>
							</div>

							<div className="w-6/12">
								<label
									htmlFor="endTime"
									className="text-black text-sm"
								>
									End Time
								</label>
								<div className="mt-1">
									<input
										type="time"
										value={scheduleUpdate.endTime}
										name="endTime"
										id="endTime"
										className="input input-bordered flex-1 h-10 text-black font-medium border-[1px] border-gray-300 rounded-[4px] w-full"
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="mt-5 flex gap-1">
							<button className="w-6/12 btn btn-success text-white">
								Update
							</button>
							<button
								type="reset"
								onClick={() => {
									document
										.getElementById(`staff_schedule_modal`)
										.close();
								}}
								className="w-6/12 btn btn-outline btn-error text-white"
							>
								Cancel
							</button>
						</div>
					</div>
				</form>
			</div>
		</dialog>
	);
}

StaffScheduleModal.propTypes = {
	staff: PropTypes.object.isRequired
};
