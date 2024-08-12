import PropTypes from "prop-types";

export default function TreatmentDetail({ treatment }) {
	// The sketch page only display data from Mysql database, will handle data from Mongo later
	// Including: doctor note, lab result, diagnose image.
	return (
		<dialog id={`treatment_${treatment.id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>

				<div className="flex justify-between mt-4 mr-7 items-center">
					<h3 className="font-bold text-xl text-blue-600">
						Treatment #{treatment.id}
					</h3>

					<div>
						<p className="text-lg">{treatment.date}</p>
					</div>
				</div>

				<div className="flex gap-14 mt-4 text-base">
					<p>
						<span className="font-semibold">Doctor:</span>{" "}
						{treatment.doctor}
					</p>

					<p>
						<span className="font-semibold">Patient:</span>{" "}
						{treatment.patient}
					</p>
				</div>

				<div className="mt-4">
					<p>
						<span className="font-bold text-lg">Description</span>{" "}
					</p>

					<p className="text-base p-3 rounded bg-slate-300 mt-2">
						{treatment.description}
					</p>
				</div>
			</div>
		</dialog>
	);
}

TreatmentDetail.propTypes = {
	treatment: PropTypes.object.isRequired
};
