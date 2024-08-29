import { useNavigate } from "react-router-dom";
import { useExtractSearchParams } from "../../utils/common";

export default function ReportSideBar() {
	const option = useExtractSearchParams("option");
	const navigate = useNavigate();

	const handleOption = (option) => {
		navigate(`/report?option=${option}`);
	};

	const defaultStyle =
		"text-center p-2 m-2 rounded-sm hover:bg-sky-200 cursor-pointer";

	return (
		<div className="flex flex-col w-2/12 border-blue-500 border-solid border-[1px] rounded-lg h-fit">
			<div
				onClick={() => handleOption("treatment")}
				className={`${defaultStyle} ${
					option === "treatment" || option === null
						? "bg-blue-300"
						: "bg-sky-100"
				}`}
			>
				Treatment Report
			</div>
			<div
				onClick={() => handleOption("job_history")}
				className={`${defaultStyle} ${
					option === "job_history" || option === ""
						? "bg-blue-300"
						: "bg-sky-100"
				}`}
			>
				Job History
			</div>
			<div
				onClick={() => handleOption("work")}
				className={`${defaultStyle} ${
					option === "work" || option === ""
						? "bg-blue-300"
						: "bg-sky-100"
				}`}
			>
				Work Report
			</div>
		</div>
	);
}
