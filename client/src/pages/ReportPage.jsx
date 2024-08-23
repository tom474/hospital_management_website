import { useEffect, useState } from "react";
import DurationModal from "../components/appointment/main/DurationModal";
import TreatmentReport from "../components/report/TreatmentReport";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentReport from "../components/report/AppointmentReport";

export default function ReportPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	// Get the value of the query parameter "option" to determine which content to display
	const option = queryParams.get("option");

	const [duration, setDuration] = useState({
		startDate: "",
		endDate: ""
	});

	const checkDuration = (duration) => {
		if (duration && duration.startDate && duration.endDate) {
			setDuration({
				startDate: duration.startDate,
				endDate: duration.endDate
			});
		} else {
			document.getElementById("duration_modal").showModal();
		}
	};

	useEffect(() => {
		const fetch = JSON.parse(localStorage.getItem("report_duration"));
		console.log(fetch);
		checkDuration(fetch);
	}, []);

	const handleUpdateDuration = (newDuration) => {
		setDuration(newDuration);
		localStorage.setItem("report_duration", JSON.stringify(newDuration));
		document.getElementById("duration_modal").close();
		checkDuration(newDuration);
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">
				System Report
			</h1>
			<div className="flex justify-between mt-2">
				<div className="flex gap-1 mt-2">
					<div
						onClick={() =>
							navigate(`/report?option=treatment_report`)
						}
						className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
							(option === "treatment_report" ||
								option === null) &&
							"bg-blue-900"
						}`}
					>
						<p>View all patient treatment in given time</p>
					</div>

					<div
						onClick={() =>
							navigate(`/report?option=appointment_report`)
						}
						className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
							option === "appointment_report" && "bg-blue-900"
						}`}
					>
						<p>View the work of all doctors in a given time</p>
					</div>
				</div>

				<div className="flex gap-1">
					<div className="p-2 flex items-center bg-blue-400 rounded text-white font-semibold text-lg">
						<p>
							{duration.startDate} {" -> "} {duration.endDate}
						</p>
					</div>

					{duration && (
						<DurationModal
							key={"report_page"}
							isTreatment={true}
							duration={duration}
							onUpdate={handleUpdateDuration}
							type="report_duration"
							mode={"date"}
						/>
					)}

					<div
						onClick={() => {
							document
								.getElementById("duration_modal")
								.showModal();
						}}
						className="px-2 flex justify-center items-center bg-blue-400 rounded text-white transition ease-in-out hover:bg-blue-300 cursor-pointer"
					>
						Edit Duration
					</div>
				</div>
			</div>

			{option === "treatment_report" && (
				<TreatmentReport duration={duration} />
			)}
			{option === null && <TreatmentReport duration={duration} />}
			{option === "appointment_report" && <AppointmentReport />}
		</div>
	);
}
