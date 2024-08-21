import PropTypes from "prop-types";
import { useState } from "react";

export default function DurationModal({
	duration,
	onUpdate,
	isTreatment = false
}) {
	const [durationUpdate, setDurationUpdate] = useState(duration);

	// Handle input change
	const handleOnChange = (e) => {
		const { name, value } = e.target;

		// Handle other types of input (text, date, time, etc.)
		setDurationUpdate((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onUpdate(durationUpdate);
		console.log(durationUpdate);
	};

	return (
		<dialog id="duration_modal" className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<h3 className="font-bold text-lg text-blue-500">
					Set duration
				</h3>
				<form onSubmit={onSubmit} method="dialog">
					<div
						onClick={() => {
							document.getElementById("duration_modal").close();
						}}
						className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2"
					>
						✕
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Date:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<input
								type="date"
								value={durationUpdate.date}
								onChange={handleOnChange}
								placeholder="Enter treatment date"
								name="date"
								id="date"
								className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							/>
						</div>
					</div>
					{!isTreatment && (
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
										value={durationUpdate.startTime}
										onChange={handleOnChange}
										placeholder="Enter start time"
										name="startTime"
										id="startTime"
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
										value={durationUpdate.endTime}
										onChange={handleOnChange}
										placeholder="Enter end time"
										name="endTime"
										id="endTime"
										className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
									/>
								</div>
							</div>
						</div>
					)}

					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							Save
						</button>
						<button
							type="reset"
							onClick={() => {
								document
									.getElementById("duration_modal")
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

DurationModal.propTypes = {
	duration: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
	isTreatment: PropTypes.bool
};
