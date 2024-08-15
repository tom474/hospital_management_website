import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
		date: "",
		startTime: "",
		endTime: ""
	});

	const checkDuration = (duration) => {
		if (
			duration &&
			duration.date &&
			duration.startTime &&
			duration.endTime
		) {
			setDuration({
				date: duration.date,
				startTime: duration.startTime,
				endTime: duration.endTime
			});
		} else {
			document.getElementById("duration_modal").showModal();
		}
	};

	useEffect(() => {
		const fetch = JSON.parse(localStorage.getItem("report_duration"));
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

			<div className="flex gap-1 mt-2">
				<div
					onClick={() => navigate(`/report?option=treatment_report`)}
					className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
						(option === "treatment_report" || option === null) &&
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

			<div className="flex justify-between">
				<div className="p-2 flex items-center w-3/12 bg-blue-400 rounded text-white font-semibold text-lg">
					<p>
						{duration.date} {"("} {duration.startTime} -{" "}
						{duration.endTime} {")"}
					</p>
				</div>

				<div className="flex justify-center items-center">
					{duration && (
						<DurationModal
							duration={duration}
							onUpdate={handleUpdateDuration}
						/>
					)}

					<div
						onClick={() => {
							document
								.getElementById("duration_modal")
								.showModal();
						}}
						className="py-2 px-3 h-fit w-36 text-center bg-blue-400 rounded text-white transition ease-in-out hover:bg-blue-300 cursor-pointer"
					>
						<span>
							<FontAwesomeIcon icon={faPlus} />
						</span>{" "}
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
