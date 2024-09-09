import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function DurationModal({
	duration,
	onUpdate,
	isTreatment = false,
	type
}) {
	const [durationUpdate, setDurationUpdate] = useState({
		startDate: duration.startDate,
		endDate: duration.endDate
	});

	useEffect(() => {
		setDurationUpdate({
			startDate: duration.startDate,
			endDate: duration.endDate
		});
	}, [duration]);

	// Handle input change
	const handleOnChange = (e) => {
		const { name, value } = e.target;

		// Handle other types of input (text, date, time, etc.)
		setDurationUpdate((prev) => ({ ...prev, [name]: value }));
	};

	const onClose = () => {
		document.getElementById("duration_modal").close();

		if (!isTreatment) {
			const duration = localStorage.getItem(type);
			if (duration == null) {
				document.getElementById("duration_modal").showModal();
			}
		}
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
						onClick={onClose}
						className="btn btn-sm btn-circle btn-ghost text-black absolute right-2 top-2"
					>
						✕
					</div>

					<div className="mt-3">
						<label htmlFor="doctor" className="text-black text-sm">
							Start Date:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<input
								type="date"
								value={durationUpdate.startDate}
								onChange={handleOnChange}
								placeholder="Enter treatment date"
								name={"startDate"}
								id="date"
								className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							/>
						</div>
					</div>
					<div className="mt-3">
						<label htmlFor="endDate" className="text-black text-sm">
							End Date:
						</label>
						<div className="flex items-center gap-3 mt-2">
							<input
								type="date"
								value={durationUpdate.endDate}
								onChange={handleOnChange}
								placeholder="Enter treatment date"
								name={"endDate"}
								id="date"
								className="input input-bordered flex-1 h-10 bg-slate-50 text-black font-medium border-[1px] border-gray-300 rounded-[4px]"
							/>
						</div>
					</div>
					<div className="mt-5 flex gap-1">
						<button className="w-6/12 btn btn-success text-white">
							Save
						</button>
						<button
							type="reset"
							onClick={onClose}
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
	isTreatment: PropTypes.bool,
	type: PropTypes.string
};
