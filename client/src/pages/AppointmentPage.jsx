import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DurationModal from "../components/appointment/main/DurationModal";
import AppointmentTable from "../components/appointment/main/AppointmentTable";

export default function AppointmentPage() {
	const [duration, setDuration] = useState({
		date: "",
		startTime: "",
		endTime: ""
	});

	const [mode, setMode] = useState(true);

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
		const fetch = JSON.parse(localStorage.getItem("duration"));
		checkDuration(fetch);
	}, []);

	const handleUpdateDuration = (newDuration) => {
		setDuration(newDuration);
		localStorage.setItem("duration", JSON.stringify(newDuration));
		document.getElementById("duration_modal").close();
		checkDuration(newDuration);
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<h1 className="mt-5 text-center w-full text-blue-400 text-5xl font-bold">
				Appointment Management
			</h1>
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
							key={"appointment_page"}
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

			<div className="flex gap-1">
				<div
					onClick={() => setMode(true)}
					className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
						mode && "bg-blue-900"
					}`}
				>
					<p>Available</p>
				</div>

				<div
					onClick={() => setMode(false)}
					className={`p-2 rounded bg-blue-400 text-white hover:bg-blue-300 cursor-pointer ${
						!mode && "bg-blue-900"
					}`}
				>
					<p>Busy</p>
				</div>
			</div>

			<AppointmentTable date={duration.date} />
		</div>
	);
}
