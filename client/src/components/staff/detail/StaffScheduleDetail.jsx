import PropTypes from "prop-types";
import { useState } from "react";
import {
	adjustDateByOneDay,
	formatDate,
	formatTime
} from "../../../utils/common";
import { usePutData } from "../../../api/apiHooks";
import { queryClient } from "../../../api";
import Loading from "../../utils/Loading";

export default function StaffScheduleDetail({ schedule }) {
	const { mutate, isPending } = usePutData({
		onSuccess: () => {
			queryClient.invalidateQueries("schedule");
			document
				.getElementById(`staff_schedule_${schedule.schedule_id}`)
				.close();
		}
	});
	const [scheduleUpdate, setScheduleUpdate] = useState({
		schedule_id: schedule.schedule_id,
		staff_id: schedule.staff_id,
		shift:
			schedule.start_time < schedule.end_time
				? "General Shift"
				: "Night Shift",
		start_time: formatTime(schedule.start_time),
		end_time: formatTime(schedule.end_time),
		date: formatDate(schedule.date)
	});
	console.log(scheduleUpdate);

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		if (name === "shift") {
			const shiftValue = JSON.parse(value); // Parse the stringified object
			setScheduleUpdate((prev) => ({
				...prev,
				shift: shiftValue.shift,
				start_time: shiftValue.start_time,
				end_time: shiftValue.end_time
			}));
		} else {
			setScheduleUpdate((prev) => ({ ...prev, [name]: value }));
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(scheduleUpdate);
		mutate({
			url: "/schedule",
			post: {
				schedule_id: scheduleUpdate.schedule_id,
				staff_id: scheduleUpdate.staff_id,
				start_time: scheduleUpdate.start_time,
				end_time: scheduleUpdate.end_time,
				date: adjustDateByOneDay(scheduleUpdate.date)
			}
		});
	};

	const role = localStorage.getItem("role");

	return (
		<dialog id={`staff_schedule_${schedule.schedule_id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<form onSubmit={onSubmit} method="dialog">
					<button
						onClick={() => {
							document
								.getElementById(
									`staff_schedule_${schedule.schedule_id}`
								)
								.close();
						}}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>

					<h1 className="font-bold text-xl text-blue-600 ">
						Schedule #{schedule.schedule_id}
					</h1>

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
									start_time: scheduleUpdate.start_time,
									end_time: scheduleUpdate.end_time
								})} // Stringify the object for value
								onChange={handleOnChange}
								className="select select-bordered w-full gap-2 bg-slate-50 border-sky-200 font-semibold"
							>
								<option disabled>Choose the shift</option>
								<option
									value={JSON.stringify({
										shift: "General Shift",
										start_time: "08:00",
										end_time: "17:00"
									})}
								>
									General Shift (08:00 - 17:00)
								</option>
								<option
									value={JSON.stringify({
										shift: "Night Shift",
										start_time: "18:00",
										end_time: "02:00"
									})}
								>
									Night Shift (18:00 - 02:00)
								</option>
							</select>
						</div>

						<div className="mt-2 flex gap-2">
							<div className="w-6/12">
								<label
									htmlFor="start_time"
									className="text-black text-sm"
								>
									Start Time
								</label>
								<div className="mt-1">
									<input
										type="time"
										value={scheduleUpdate.start_time}
										name="start_time"
										id="start_time"
										className="input input-bordered flex-1 h-10 text-black font-medium border-[1px] border-gray-300 rounded-[4px] w-full"
										disabled
									/>
								</div>
							</div>

							<div className="w-6/12">
								<label
									htmlFor="end_time"
									className="text-black text-sm"
								>
									End Time
								</label>
								<div className="mt-1">
									<input
										type="time"
										value={scheduleUpdate.end_time}
										name="end_time"
										id="end_time"
										className="input input-bordered flex-1 h-10 text-black font-medium border-[1px] border-gray-300 rounded-[4px] w-full"
										disabled
									/>
								</div>
							</div>
						</div>
						{role === "Admin" && (
							<div className="mt-5 flex gap-1">
								<button className="w-6/12 btn btn-success text-white">
									{isPending ? (
										<Loading isFull={false} />
									) : (
										"Update"
									)}
								</button>
								<button
									type="reset"
									onClick={() => {
										document
											.getElementById(
												`staff_schedule_${schedule.schedule_id}`
											)
											.close();
									}}
									className="w-6/12 btn btn-outline btn-error text-white"
								>
									Cancel
								</button>
							</div>
						)}
					</div>
				</form>
			</div>
		</dialog>
	);
}

StaffScheduleDetail.propTypes = {
	schedule: PropTypes.object.isRequired
};
