import PropTypes from "prop-types";

export default function ScheduleDetail({ schedule, patient }) {
	// The sketch page only display data from Mysql database, will handle data from Mongo later.
	// Including: Note during, after the schedule.
	return (
		<dialog id={`schedule_${schedule.id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>

				<div className="flex justify-between mt-4 mr-7 items-center">
					<h3 className="font-bold text-xl text-blue-600">
						Schedule #{schedule.id}
					</h3>

					<div>
						<p className="text-lg">{schedule.date}</p>
					</div>
				</div>

				<div className="flex gap-14 mt-4 text-base">
					<p>
						<span className="font-semibold">Doctor:</span>{" "}
						{schedule.doctor}
					</p>

					<p>
						<span className="font-semibold">Patient:</span>{" "}
						{patient}
					</p>
				</div>

				<div className="mt-4">
					<p>
						<span className="font-bold text-lg">Purpose</span>{" "}
					</p>

					<p className="text-base p-3 rounded bg-slate-300 mt-2">
						{schedule.purpose}
					</p>
				</div>
			</div>
		</dialog>
	);
}

ScheduleDetail.propTypes = {
	schedule: PropTypes.object.isRequired,
	patient: PropTypes.string.isRequired
};
