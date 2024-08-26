import PropTypes from "prop-types";
import { formatDate } from "../../../utils/common";
import ImageModal from "../../utils/ImageModal";

export default function TreatmentDetail({ treatment, patientName, staffName }) {
	// The sketch page only display data from Mysql database, will handle data from Mongo later
	// Including: doctor note, lab result, diagnose image.
	return (
		<dialog id={`treatment_${treatment.treatment_id}`} className="modal">
			<div className="modal-box bg-sky-50 max-w-[650px] w-[650px] h-fit max-h-[650px]">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>

				<div className="flex justify-between mt-4 mr-7 items-center">
					<h3 className="font-bold text-xl text-blue-600">
						Treatment #{treatment.treatment_id}
					</h3>

					<div>
						<p className="text-lg">{formatDate(treatment.date)}</p>
					</div>
				</div>

				<div className="flex gap-14 mt-4 text-base">
					<p>
						<span className="font-semibold">Doctor:</span>{" "}
						{staffName}
					</p>

					<p>
						<span className="font-semibold">Patient:</span>{" "}
						{patientName}
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
				<div className="flex gap-2 justify-around">
					{treatment.diagnoseImage && (
						<div className="mt-4">
							<ImageModal
								key={treatment.treatment_id + "_diagnose_image"}
								modalId={
									treatment.treatment_id + "_diagnose_image"
								}
								imageUrl={treatment.diagnoseImage.data}
							/>
							<p>
								<span className="font-bold text-lg">
									Diagnose Image
								</span>
							</p>

							<img
								src={treatment.diagnoseImage.data}
								onClick={() => {
									document
										.getElementById(
											`${treatment.treatment_id}_diagnose_image`
										)
										.showModal();
								}}
								alt="Diagnose"
								className="w-64 h-64 object-cover mt-2 hover:opacity-75 cursor-pointer"
							/>
						</div>
					)}
					{treatment.labResults && (
						<div className="mt-4">
							<ImageModal
								key={treatment.treatment_id + "_lab_results"}
								modalId={
									treatment.treatment_id + "_lab_results"
								}
								imageUrl={treatment.labResults.data}
							/>
							<p>
								<span className="font-bold text-lg">
									Lab Result
								</span>
							</p>

							<img
								src={treatment.labResults.data}
								onClick={() => {
									document
										.getElementById(
											`${treatment.treatment_id}_lab_results`
										)
										.showModal();
								}}
								alt="Diagnose"
								className="w-64 h-64 object-cover mt-2 hover:opacity-75 cursor-pointer"
							/>
						</div>
					)}
				</div>
			</div>
		</dialog>
	);
}

TreatmentDetail.propTypes = {
	treatment: PropTypes.object.isRequired,
	patientName: PropTypes.string,
	staffName: PropTypes.string
};
