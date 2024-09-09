import { useEffect, useState } from "react";
import DurationModal from "../components/appointment/main/DurationModal";
import ReportSideBar from "../components/report/ReportSideBar";
import { useExtractSearchParams } from "../utils/common";
import TreatmentReport from "../components/report/TreatmentReport";
import JobHistory from "../components/report/JobHistory";
import WorkReport from "../components/report/WorkReport";

export default function ReportPage() {
	const option = useExtractSearchParams("option");

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
				Hospital Report
			</h1>
			<div className="flex gap-5 mt-2">
				<ReportSideBar />
				<div className="flex flex-col flex-1 gap-1">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl text-blue-400 font-semibold">
							{(option === null || option === "treatment") &&
								"Treatment Report"}
							{option === "job_history" && "Job History Report"}
							{option === "work" && "Work Report"}
						</h1>
						{option !== "job_history" && (
							<div className="flex gap-1 items-center">
								<div className="p-2 bg-blue-400 rounded text-white font-semibold text-lg">
									<p>
										{duration.startDate} {" -> "}{" "}
										{duration.endDate}
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
									className="p-[10px] flex justify-center items-center bg-blue-400 rounded text-white transition ease-in-out hover:bg-blue-300 cursor-pointer"
								>
									Edit Duration
								</div>
							</div>
						)}
					</div>

					{(option === null || option === "treatment") && (
						<TreatmentReport duration={duration} />
					)}

					{option === "job_history" && (
						<JobHistory duration={duration} />
					)}
					{option === "work" && <WorkReport duration={duration} />}
				</div>
			</div>
		</div>
	);
}
